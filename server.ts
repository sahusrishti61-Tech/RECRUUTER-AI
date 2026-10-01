import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper function to call Gemini with retry and fallback models
async function generateContentWithRetry(params: {
  contents: string;
  systemInstruction?: string;
  responseSchema?: any;
}) {
  const models = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let lastError: any = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const config: any = {
          responseMimeType: 'application/json',
        };
        if (params.systemInstruction) {
          config.systemInstruction = params.systemInstruction;
        }
        if (params.responseSchema) {
          config.responseSchema = params.responseSchema;
        }

        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config,
        });

        return response;
      } catch (err: any) {
        lastError = err;
        const errMsg = String(err.message || '');
        const isTransient = errMsg.includes('503') || errMsg.includes('UNAVAILABLE') || errMsg.includes('high demand') || errMsg.includes('429');
        if (isTransient && attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
          continue;
        }
        break; // Try next model in list
      }
    }
  }

  throw lastError;
}

const RECRUITER_SYSTEM_PROMPT = `
You are an expert technical recruiter and career coach with 15+ years of experience screening resumes across industries (tech, finance, healthcare, startups, Fortune 500).

Your goal is to evaluate the provided resume against the TARGET ROLE and EXPERIENCE LEVEL (and optional JOB DESCRIPTION), delivering a thorough, candid, actionable review.

STRICT EVALUATION RULES:
1. Be specific and honest, not generic or flattering. If a bullet is weak, say why without softening the blow.
2. Quote the resume directly when highlighting problems, weak phrasing, or red flags.
3. Do NOT invent experience or metrics the candidate doesn't have. If suggesting metrics, denote them as [e.g., X%] or ask the candidate.
4. If critical information is missing (dates, team size, company scale, tools, scope), explicitly ask the candidate instead of guessing.
5. In Section 6 (Actionable Improvements), rewrite 3 weak bullet points strictly using the recruiter gold-standard formula:
   Action verb + task + tool/method + quantified result.
6. Provide an ATS keyword match assessment and score based on real industry parsing criteria.
`;

app.post('/api/analyze-resume', async (req: Request, res: Response) => {
  try {
    const { resume, targetRole, experienceLevel, jobDescription } = req.body;

    if (!resume || typeof resume !== 'string' || resume.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide valid resume text (at least 20 characters).' });
    }

    const prompt = `
TASK: Analyze the following resume thoroughly based on your 15+ years of technical recruiting experience.

TARGET ROLE: ${targetRole || 'Not specified (infer best fit)'}
EXPERIENCE LEVEL: ${experienceLevel || 'Mid-Level'}

RESUME CONTENT:
"""
${resume}
"""

${jobDescription ? `JOB DESCRIPTION TO BENCHMARK AGAINST:\n"""\n${jobDescription}\n"""` : 'NO JOB DESCRIPTION PROVIDED (Benchmark against competitive industry standards for this target role and level).'}

Please generate a structured, honest, in-depth recruiter evaluation adhering to the 7 required sections. Return strictly JSON matching the specified schema.
`;

    const response = await generateContentWithRetry({
      contents: prompt,
      systemInstruction: RECRUITER_SYSTEM_PROMPT,
      responseSchema: {
          type: Type.OBJECT,
          properties: {
            snapshot: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING, description: 'One-paragraph summary of the candidate profile' },
                overallScore: { type: Type.NUMBER, description: 'Score out of 10 (e.g. 6.5, 7.8)' },
                scoreJustification: { type: Type.STRING, description: 'One-line justification for the score' },
                subScores: {
                  type: Type.OBJECT,
                  properties: {
                    technicalMatch: { type: Type.NUMBER, description: 'Score out of 10' },
                    impactAndQuantification: { type: Type.NUMBER, description: 'Score out of 10' },
                    atsReadability: { type: Type.NUMBER, description: 'Score out of 10' },
                    careerTrajectory: { type: Type.NUMBER, description: 'Score out of 10' },
                  },
                  required: ['technicalMatch', 'impactAndQuantification', 'atsReadability', 'careerTrajectory'],
                },
              },
              required: ['summary', 'overallScore', 'scoreJustification', 'subScores'],
            },
            skillsIdentified: {
              type: Type.OBJECT,
              properties: {
                technicalSkills: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      category: { type: Type.STRING },
                      skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ['category', 'skills'],
                  },
                },
                softSkills: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      skill: { type: Type.STRING },
                      evidence: { type: Type.STRING, description: 'Direct evidence or project proof found in the resume' },
                    },
                    required: ['skill', 'evidence'],
                  },
                },
                toolsAndDomainKnowledge: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                certifications: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['technicalSkills', 'softSkills', 'toolsAndDomainKnowledge', 'certifications'],
            },
            strengths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  detail: { type: Type.STRING },
                },
                required: ['title', 'detail'],
              },
              description: 'Top 3-5 things that make this resume stand out',
            },
            gapsAndWeaknesses: {
              type: Type.OBJECT,
              properties: {
                missingSkillsOrKeywords: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Missing skills or critical keywords for the target role',
                },
                experienceOrEducationGaps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                redFlags: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING, description: 'e.g. Unexplained Career Gap, Vague Role, Job-Hopping, Passive Phrasing' },
                      explanation: { type: Type.STRING },
                      quote: { type: Type.STRING, description: 'Quote from resume or specify missing timeframe' },
                    },
                    required: ['type', 'explanation'],
                  },
                },
                weakOrUnquantifiedBullets: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      quote: { type: Type.STRING, description: 'Exact quote from resume' },
                      critique: { type: Type.STRING, description: 'Why this bullet fails to impress a recruiter' },
                    },
                    required: ['quote', 'critique'],
                  },
                },
              },
              required: ['missingSkillsOrKeywords', 'experienceOrEducationGaps', 'redFlags', 'weakOrUnquantifiedBullets'],
            },
            atsAndFormattingCheck: {
              type: Type.OBJECT,
              properties: {
                keywordMatchPercentage: { type: Type.NUMBER, description: '0-100%' },
                verdict: { type: Type.STRING },
                matchedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                formattingIssues: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      issue: { type: Type.STRING },
                      severity: { type: Type.STRING, description: 'High, Medium, or Low' },
                      recommendation: { type: Type.STRING },
                    },
                    required: ['issue', 'severity', 'recommendation'],
                  },
                },
              },
              required: ['keywordMatchPercentage', 'verdict', 'matchedKeywords', 'missingKeywords', 'formattingIssues'],
            },
            actionableImprovements: {
              type: Type.OBJECT,
              properties: {
                quickWins: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Can fix in under 30 minutes',
                },
                mediumTermFixes: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Courses, projects, certifications, structural rewrite',
                },
                rewrittenBullets: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      originalQuote: { type: Type.STRING },
                      rewrittenBullet: { type: Type.STRING, description: 'Action verb + task + tool/method + quantified result' },
                      formulaBreakdown: {
                        type: Type.OBJECT,
                        properties: {
                          actionVerb: { type: Type.STRING },
                          task: { type: Type.STRING },
                          toolMethod: { type: Type.STRING },
                          quantifiedResult: { type: Type.STRING },
                        },
                        required: ['actionVerb', 'task', 'toolMethod', 'quantifiedResult'],
                      },
                      recruiterNotes: { type: Type.STRING },
                    },
                    required: ['originalQuote', 'rewrittenBullet', 'formulaBreakdown', 'recruiterNotes'],
                  },
                  description: 'At least 3 rewritten bullets formatted with the strict formula',
                },
              },
              required: ['quickWins', 'mediumTermFixes', 'rewrittenBullets'],
            },
            skillGapRoadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  priority: { type: Type.STRING, description: 'High, Medium, or Low' },
                  suggestedResources: { type: Type.ARRAY, items: { type: Type.STRING } },
                  realisticTimeline: { type: Type.STRING },
                  targetCompetency: { type: Type.STRING },
                },
                required: ['skill', 'priority', 'suggestedResources', 'realisticTimeline', 'targetCompetency'],
              },
            },
            recruiterQuestionsForMissingInfo: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Questions recruiter would ask the candidate because crucial details were omitted',
            },
          },
          required: [
            'snapshot',
            'skillsIdentified',
            'strengths',
            'gapsAndWeaknesses',
            'atsAndFormattingCheck',
            'actionableImprovements',
            'skillGapRoadmap',
            'recruiterQuestionsForMissingInfo',
          ],
        },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    return res.status(500).json({
      error: 'Failed to analyze resume.',
      details: error.message || 'Unknown error occurred.',
    });
  }
});

// Endpoint for Interactive Bullet Rewriting on demand
app.post('/api/rewrite-bullet', async (req: Request, res: Response) => {
  try {
    const { bulletText, targetRole, focus } = req.body;
    if (!bulletText || typeof bulletText !== 'string') {
      return res.status(400).json({ error: 'Please provide a resume bullet point to rewrite.' });
    }

    const prompt = `
As an executive technical recruiter with 15+ years of screening experience, rewrite this resume bullet point:
Original Bullet: "${bulletText}"
Target Role: ${targetRole || 'Software Professional'}
Focus Angle: ${focus || 'Quantified Metric & Business Impact'}

Strict Rule: Use the recruiter formula:
Action verb + task + tool/method + quantified result.
Provide 3 distinct recruiter-grade variations:
1. High-Metric & Revenue/Efficiency Focus
2. Technical Depth & Tool Mastery Focus
3. Leadership & Stakeholder Impact Focus
`;

    const response = await generateContentWithRetry({
      contents: prompt,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          variations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                angle: { type: Type.STRING },
                rewritten: { type: Type.STRING },
                actionVerb: { type: Type.STRING },
                task: { type: Type.STRING },
                toolMethod: { type: Type.STRING },
                quantifiedResult: { type: Type.STRING },
                recruiterTakeaway: { type: Type.STRING },
              },
              required: ['angle', 'rewritten', 'actionVerb', 'task', 'toolMethod', 'quantifiedResult', 'recruiterTakeaway'],
            },
          },
        },
        required: ['variations'],
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error rewriting bullet:', error);
    return res.status(500).json({ error: error.message || 'Failed to rewrite bullet.' });
  }
});

// Serve frontend with Vite in dev, static in prod
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`RecruiterAI Server running on port ${PORT}`);
});
