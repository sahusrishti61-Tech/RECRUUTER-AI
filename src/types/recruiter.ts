export interface SubScores {
  technicalMatch: number;
  impactAndQuantification: number;
  atsReadability: number;
  careerTrajectory: number;
}

export interface Snapshot {
  summary: string;
  overallScore: number;
  scoreJustification: string;
  subScores: SubScores;
}

export interface TechnicalSkillCategory {
  category: string;
  skills: string[];
}

export interface SoftSkillEvidence {
  skill: string;
  evidence: string;
}

export interface SkillsIdentified {
  technicalSkills: TechnicalSkillCategory[];
  softSkills: SoftSkillEvidence[];
  toolsAndDomainKnowledge: string[];
  certifications: string[];
}

export interface StrengthItem {
  title: string;
  detail: string;
}

export interface RedFlagItem {
  type: string;
  explanation: string;
  quote?: string;
}

export interface WeakBulletItem {
  quote: string;
  critique: string;
}

export interface GapsAndWeaknesses {
  missingSkillsOrKeywords: string[];
  experienceOrEducationGaps: string[];
  redFlags: RedFlagItem[];
  weakOrUnquantifiedBullets: WeakBulletItem[];
}

export interface FormattingIssue {
  issue: string;
  severity: 'High' | 'Medium' | 'Low' | string;
  recommendation: string;
}

export interface AtsAndFormattingCheck {
  keywordMatchPercentage: number;
  verdict: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingIssues: FormattingIssue[];
}

export interface FormulaBreakdown {
  actionVerb: string;
  task: string;
  toolMethod: string;
  quantifiedResult: string;
}

export interface RewrittenBullet {
  originalQuote: string;
  rewrittenBullet: string;
  formulaBreakdown: FormulaBreakdown;
  recruiterNotes: string;
}

export interface ActionableImprovements {
  quickWins: string[];
  mediumTermFixes: string[];
  rewrittenBullets: RewrittenBullet[];
}

export interface SkillRoadmapItem {
  skill: string;
  priority: 'High' | 'Medium' | 'Low' | string;
  suggestedResources: string[];
  realisticTimeline: string;
  targetCompetency: string;
}

export interface ResumeAnalysisResult {
  snapshot: Snapshot;
  skillsIdentified: SkillsIdentified;
  strengths: StrengthItem[];
  gapsAndWeaknesses: GapsAndWeaknesses;
  atsAndFormattingCheck: AtsAndFormattingCheck;
  actionableImprovements: ActionableImprovements;
  skillGapRoadmap: SkillRoadmapItem[];
  recruiterQuestionsForMissingInfo: string[];
}

export interface BulletVariation {
  angle: string;
  rewritten: string;
  actionVerb: string;
  task: string;
  toolMethod: string;
  quantifiedResult: string;
  recruiterTakeaway: string;
}
