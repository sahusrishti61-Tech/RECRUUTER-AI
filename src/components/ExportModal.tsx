import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { ResumeAnalysisResult } from '../types/recruiter';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ResumeAnalysisResult;
  targetRole: string;
  experienceLevel: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  result,
  targetRole,
  experienceLevel,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdownReport = () => {
    return `# TECHNICAL RECRUITER & CAREER COACH RESUME AUDIT
TARGET ROLE: ${targetRole}
EXPERIENCE LEVEL: ${experienceLevel}
ASSESSMENT DATE: ${new Date().toLocaleDateString()}

============================================================
1. SNAPSHOT
============================================================
${result.snapshot.summary}

OVERALL RESUME SCORE: ${result.snapshot.overallScore} / 10
JUSTIFICATION: ${result.snapshot.scoreJustification}

SUB-SCORES BREAKDOWN:
- Technical Match: ${result.snapshot.subScores.technicalMatch}/10
- Impact & Quantification: ${result.snapshot.subScores.impactAndQuantification}/10
- ATS & Formatting Readability: ${result.snapshot.subScores.atsReadability}/10
- Career Trajectory & Scope: ${result.snapshot.subScores.careerTrajectory}/10

============================================================
2. SKILLS IDENTIFIED
============================================================
TECHNICAL SKILLS:
${result.skillsIdentified.technicalSkills.map((c) => `- ${c.category}: ${c.skills.join(', ')}`).join('\n')}

SOFT SKILLS (EVIDENCE-BACKED ONLY):
${result.skillsIdentified.softSkills.map((s) => `- ${s.skill}: "${s.evidence}"`).join('\n')}

TOOLS, CERTIFICATIONS & DOMAIN KNOWLEDGE:
- Tools & Domain: ${result.skillsIdentified.toolsAndDomainKnowledge.join(', ')}
- Certifications: ${result.skillsIdentified.certifications.length > 0 ? result.skillsIdentified.certifications.join(', ') : 'None explicitly listed'}

============================================================
3. STRENGTHS (TOP STANDOUTS)
============================================================
${result.strengths.map((s, i) => `${i + 1}. ${s.title}\n   ${s.detail}`).join('\n\n')}

============================================================
4. GAPS & WEAKNESSES
============================================================
MISSING SKILLS OR KEYWORDS FOR TARGET ROLE:
${result.gapsAndWeaknesses.missingSkillsOrKeywords.map((k) => `- ${k}`).join('\n')}

EXPERIENCE OR EDUCATION GAPS:
${result.gapsAndWeaknesses.experienceOrEducationGaps.map((g) => `- ${g}`).join('\n')}

RED FLAGS (GAPS, VAGUE ROLES, PASSSIVE PHRASING):
${result.gapsAndWeaknesses.redFlags.map((rf) => `- [${rf.type}] ${rf.explanation} ${rf.quote ? `(Quote: "${rf.quote}")` : ''}`).join('\n')}

WEAK OR UNQUANTIFIED BULLET POINTS:
${result.gapsAndWeaknesses.weakOrUnquantifiedBullets.map((w, i) => `${i + 1}. Quote: "${w.quote}"\n   Critique: ${w.critique}`).join('\n\n')}

============================================================
5. ATS & FORMATTING CHECK
============================================================
KEYWORD MATCH: ${result.atsAndFormattingCheck.keywordMatchPercentage}%
VERDICT: ${result.atsAndFormattingCheck.verdict}

MATCHED KEYWORDS: ${result.atsAndFormattingCheck.matchedKeywords.join(', ')}
MISSING CRITICAL KEYWORDS: ${result.atsAndFormattingCheck.missingKeywords.join(', ')}

FORMATTING ISSUES:
${result.atsAndFormattingCheck.formattingIssues.map((f) => `- [${f.severity} Priority] ${f.issue}\n  Fix: ${f.recommendation}`).join('\n')}

============================================================
6. ACTIONABLE IMPROVEMENTS (PRIORITIZED)
============================================================
QUICK WINS (< 30 MINUTES):
${result.actionableImprovements.quickWins.map((qw) => `[ ] ${qw}`).join('\n')}

MEDIUM-TERM FIXES:
${result.actionableImprovements.mediumTermFixes.map((mf) => `[ ] ${mf}`).join('\n')}

BULLET REWRITES (FORMULA: Action verb + task + tool/method + quantified result):
${result.actionableImprovements.rewrittenBullets.map((b, i) => `
Rewrite #${i + 1}:
Original: "${b.originalQuote}"
Recruiter Rewrite:
-> ${b.rewrittenBullet}
Breakdown:
- Action Verb: ${b.formulaBreakdown.actionVerb}
- Task: ${b.formulaBreakdown.task}
- Tool/Method: ${b.formulaBreakdown.toolMethod}
- Quantified Result: ${b.formulaBreakdown.quantifiedResult}
Notes: ${b.recruiterNotes}
`).join('\n')}

============================================================
7. SKILL GAP ROADMAP
============================================================
${result.skillGapRoadmap.map((r, i) => `${i + 1}. ${r.skill} [Priority: ${r.priority}]
   Timeline: ${r.realisticTimeline}
   Target Competency: ${r.targetCompetency}
   Suggested Resources:
   ${r.suggestedResources.map((res) => `  * ${res}`).join('\n')}
`).join('\n')}

============================================================
RECRUITER QUESTIONS FOR MISSING INFO
(Rule: Ask instead of guessing)
============================================================
${result.recruiterQuestionsForMissingInfo.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`;
  };

  const reportText = generateMarkdownReport();

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RecruiterAI_Audit_${targetRole.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Export Full Recruiter Assessment</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-3 flex-1 overflow-y-auto">
          <p className="text-xs text-slate-500 mb-2">
            Formatted strictly following the 7-section prompt standard for recruiters, career coaches, or offline revision.
          </p>
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-[50vh] overflow-y-auto border border-slate-800">
            {reportText}
          </pre>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500">Format: Standard Markdown (.md)</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download .md File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
