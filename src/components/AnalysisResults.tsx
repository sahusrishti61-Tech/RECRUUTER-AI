import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  FileSearch,
  Zap,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  ArrowUpRight,
  Download,
  Share2,
} from 'lucide-react';
import { ResumeAnalysisResult, RewrittenBullet } from '../types/recruiter';

interface AnalysisResultsProps {
  result: ResumeAnalysisResult;
  targetRole: string;
  experienceLevel: string;
  onOpenRewriterWithBullet?: (bullet: string) => void;
  onOpenExport: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  targetRole,
  experienceLevel,
  onOpenRewriterWithBullet,
  onOpenExport,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'snapshot' | 'skills' | 'strengths' | 'gaps' | 'ats' | 'rewrites' | 'roadmap'>('all');
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'text-emerald-600 bg-emerald-50 border-emerald-200 ring-emerald-100';
    if (score >= 6.5) return 'text-amber-600 bg-amber-50 border-amber-200 ring-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-200 ring-rose-100';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8.5) return 'Strong Contender (Top 10%)';
    if (score >= 7.0) return 'Competitive with Polish';
    if (score >= 5.5) return 'Needs Significant Quant & Structure';
    return 'High Screening Risk (Likely Auto-Reject)';
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const tabs = [
    { id: 'all', label: 'Complete Audit' },
    { id: 'snapshot', label: '1. Snapshot & Score' },
    { id: 'skills', label: '2. Skills Matrix' },
    { id: 'strengths', label: '3. Strengths' },
    { id: 'gaps', label: '4. Gaps & Red Flags' },
    { id: 'ats', label: '5. ATS & Formatting' },
    { id: 'rewrites', label: '6. Quantified Rewrites' },
    { id: 'roadmap', label: '7. Skill Roadmap' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              AUDIT COMPLETE
            </span>
            <span className="text-xs text-slate-400">&bull; 15-Year Recruiter Assessment</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">
            Evaluation for {targetRole}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Benchmarked against competitive <span className="font-semibold text-indigo-300">{experienceLevel}</span> technical hiring standards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExport}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (.md)</span>
          </button>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 text-xs font-semibold whitespace-nowrap rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: SNAPSHOT */}
      {(activeTab === 'all' || activeTab === 'snapshot') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">SNAPSHOT</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              Executive Recruiter Summary
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Score Card */}
            <div className="lg:col-span-1 bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Overall Resume Score
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-4xl font-extrabold tracking-tight px-3 py-1 rounded-xl border ring-4 ${getScoreColor(result.snapshot.overallScore)}`}>
                    {result.snapshot.overallScore}
                  </span>
                  <span className="text-lg font-semibold text-slate-400">/ 10</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-700">
                  {getScoreBadge(result.snapshot.overallScore)}
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Recruiter Verdict:</span>
                &quot;{result.snapshot.scoreJustification}&quot;
              </div>

              {/* Sub-scores breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Technical Fit:</span>
                  <span className="font-bold font-mono text-slate-900">{result.snapshot.subScores.technicalMatch}/10</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${(result.snapshot.subScores.technicalMatch / 10) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-slate-600 pt-1">
                  <span>Impact & Quantification:</span>
                  <span className="font-bold font-mono text-slate-900">{result.snapshot.subScores.impactAndQuantification}/10</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${(result.snapshot.subScores.impactAndQuantification / 10) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-slate-600 pt-1">
                  <span>ATS & Formatting:</span>
                  <span className="font-bold font-mono text-slate-900">{result.snapshot.subScores.atsReadability}/10</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(result.snapshot.subScores.atsReadability / 10) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-slate-600 pt-1">
                  <span>Career Trajectory:</span>
                  <span className="font-bold font-mono text-slate-900">{result.snapshot.subScores.careerTrajectory}/10</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${(result.snapshot.subScores.careerTrajectory / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileSearch className="w-4 h-4 text-indigo-600" />
                  Candidate Profile Summary
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {result.snapshot.summary}
                </p>
              </div>

              {/* Recruiter Missing Info Questions Callout */}
              {result.recruiterQuestionsForMissingInfo && result.recruiterQuestionsForMissingInfo.length > 0 && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Recruiter Questions (Rule: Inquire instead of guessing missing facts)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-800 list-disc list-inside">
                    {result.recruiterQuestionsForMissingInfo.map((q, idx) => (
                      <li key={idx} className="leading-snug">{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: SKILLS IDENTIFIED */}
      {(activeTab === 'all' || activeTab === 'skills') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">SKILLS IDENTIFIED</h3>
            </div>
            <span className="text-xs text-slate-500">Categorized & Evidence-Backed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Technical Skills Categorized */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                Technical Skills (Grouped by Category)
              </h4>
              <div className="space-y-2.5">
                {result.skillsIdentified.technicalSkills.map((cat, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-800 block mb-1.5">{cat.category}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] font-medium text-slate-700 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills (Backed by Evidence ONLY) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Soft Skills (Backed by Verifiable Evidence Only)
              </h4>
              <p className="text-[11px] text-slate-500 italic">
                Rule enforced: Excludes unsubstantiated buzzwords (&quot;hard worker&quot;, &quot;strategic thinker&quot;) unless supported by concrete resume achievements.
              </p>
              <div className="space-y-2">
                {result.skillsIdentified.softSkills.map((item, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                    <span className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                      &bull; {item.skill}
                    </span>
                    <p className="text-[11px] text-emerald-800 italic pl-2 border-l border-emerald-300">
                      Proof: &quot;{item.evidence}&quot;
                    </p>
                  </div>
                ))}
              </div>

              {/* Tools, Certifications & Domain */}
              <div className="pt-2 space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Tools & Domain Knowledge
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.skillsIdentified.toolsAndDomainKnowledge.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded-md text-[11px] font-medium text-indigo-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {result.skillsIdentified.certifications && result.skillsIdentified.certifications.length > 0 && (
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <span className="text-xs font-bold text-blue-900 block mb-1">
                      Certifications & Credentials
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.skillsIdentified.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-white border border-blue-200 rounded-md text-[11px] font-semibold text-blue-800"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: STRENGTHS */}
      {(activeTab === 'all' || activeTab === 'strengths') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">STRENGTHS</h3>
            </div>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Top 3-5 Standout Elements
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {result.strengths.map((strength, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/40 to-white space-y-1.5 shadow-2xs"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-emerald-950">{strength.title}</h4>
                </div>
                <p className="text-xs text-slate-600 pl-7 leading-relaxed">{strength.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: GAPS & WEAKNESSES */}
      {(activeTab === 'all' || activeTab === 'gaps') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">GAPS & WEAKNESSES</h3>
            </div>
            <span className="text-xs text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Unflinching Recruiter Audit
            </span>
          </div>

          {/* Missing Skills and Experience Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Missing Target Skills & Keywords
              </h4>
              <p className="text-[11px] text-slate-500">
                Critical tools expected for a competitive {targetRole}:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.gapsAndWeaknesses.missingSkillsOrKeywords.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200"
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-500" />
                Experience or Education Gaps
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                {result.gapsAndWeaknesses.experienceOrEducationGaps.map((gap, idx) => (
                  <li key={idx} className="leading-snug">{gap}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Red Flags Callout */}
          {result.gapsAndWeaknesses.redFlags.length > 0 && (
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                Screening Red Flags (Gaps, Vague Roles, Job-Hopping)
              </h4>
              <div className="space-y-2">
                {result.gapsAndWeaknesses.redFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold">
                        {flag.type}
                      </span>
                    </div>
                    <p className="text-rose-950 font-medium">{flag.explanation}</p>
                    {flag.quote && (
                      <p className="text-rose-800 text-[11px] italic pl-2 border-l-2 border-rose-400">
                        Quoted: &quot;{flag.quote}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weak or Unquantified Bullets with Exact Quotes */}
          <div className="space-y-2.5 pt-1">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileSearch className="w-4 h-4 text-amber-600" />
              Weak or Unquantified Bullet Points (Quoted Directly)
            </h4>
            <div className="space-y-2.5">
              {result.gapsAndWeaknesses.weakOrUnquantifiedBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-amber-50/40 rounded-xl border border-amber-200 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-amber-900 font-semibold">
                      Weak Phrasing #{idx + 1}
                    </span>
                    {onOpenRewriterWithBullet && (
                      <button
                        onClick={() => onOpenRewriterWithBullet(bullet.quote)}
                        className="text-[11px] text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        Rewrite This in Studio
                      </button>
                    )}
                  </div>
                  <p className="text-slate-900 font-mono text-xs pl-2.5 border-l-2 border-amber-400 bg-white/70 py-1.5 px-2 rounded">
                    &quot;{bullet.quote}&quot;
                  </p>
                  <p className="text-slate-700 text-xs">
                    <strong className="text-amber-900">Why it fails recruiter screen:</strong> {bullet.critique}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: ATS & FORMATTING CHECK */}
      {(activeTab === 'all' || activeTab === 'ats') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                5
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">ATS & FORMATTING CHECK</h3>
            </div>
            <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Parser & Filter Audit
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Match Rate Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  ATS Keyword Match
                </span>
                <div className="text-3xl font-extrabold text-indigo-700 mt-1">
                  {result.atsAndFormattingCheck.keywordMatchPercentage}%
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${result.atsAndFormattingCheck.keywordMatchPercentage}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-slate-700 font-medium">
                {result.atsAndFormattingCheck.verdict}
              </div>
            </div>

            {/* Matched vs Missing Keywords */}
            <div className="md:col-span-2 space-y-2">
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <span className="text-xs font-bold text-emerald-900 block mb-1">
                  Matched Core Keywords ({result.atsAndFormattingCheck.matchedKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {result.atsAndFormattingCheck.matchedKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-medium"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                <span className="text-xs font-bold text-rose-900 block mb-1">
                  Missing Critical Keywords ({result.atsAndFormattingCheck.missingKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {result.atsAndFormattingCheck.missingKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[11px] font-medium"
                    >
                      ✕ {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Formatting Issues List */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Formatting & Readability Traps
            </h4>
            <div className="space-y-2">
              {result.atsAndFormattingCheck.formattingIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border bg-slate-50/80 border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          issue.severity === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : issue.severity === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {issue.severity} Priority
                      </span>
                      <span className="font-semibold text-slate-900">{issue.issue}</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{issue.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: ACTIONABLE IMPROVEMENTS & REWRITES */}
      {(activeTab === 'all' || activeTab === 'rewrites') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                6
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                ACTIONABLE IMPROVEMENTS (PRIORITIZED)
              </h3>
            </div>
            <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              Formula Rewrites + Quick Wins
            </span>
          </div>

          {/* Quick Wins & Medium Term Fixes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200 space-y-2">
              <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600" />
                Quick Wins (Fix in Under 30 Minutes)
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-900">
                {result.actionableImprovements.quickWins.map((win, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-200 space-y-2">
              <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Medium-Term Fixes (Courses, Projects & Scope)
              </h4>
              <ul className="space-y-1.5 text-xs text-blue-900">
                {result.actionableImprovements.mediumTermFixes.map((fix, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">&bull;</span>
                    <span>{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3 Strict Formula Bullet Rewrites */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Rewritten Bullet Points (Gold-Standard Recruiter Formula)
                </h4>
                <p className="text-[11px] text-slate-500 font-mono">
                  Formula: Action verb + task + tool/method + quantified result
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {result.actionableImprovements.rewrittenBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-indigo-100 bg-slate-50/50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-600 text-white">
                      Rewrite #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleCopyBullet(bullet.rewrittenBullet, idx)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-indigo-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                    >
                      {copiedBulletIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Rewritten Bullet</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Original vs Rewritten side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-rose-50/40 rounded-lg border border-rose-200 space-y-1">
                      <span className="font-semibold text-rose-800 text-[11px] block">
                        Original (Weak / Passive):
                      </span>
                      <p className="font-mono text-slate-800 text-xs">
                        &quot;{bullet.originalQuote}&quot;
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-300 space-y-1">
                      <span className="font-semibold text-emerald-800 text-[11px] block">
                        Recruiter Formula Version:
                      </span>
                      <p className="font-bold text-slate-900 text-xs leading-relaxed">
                        &bull; {bullet.rewrittenBullet}
                      </p>
                    </div>
                  </div>

                  {/* Formula Breakdown Tags */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
                    <div className="p-1.5 rounded-md bg-emerald-50 border border-emerald-100">
                      <span className="font-semibold text-emerald-800 block">Action Verb:</span>
                      <span className="text-emerald-700 font-mono font-medium">{bullet.formulaBreakdown.actionVerb}</span>
                    </div>
                    <div className="p-1.5 rounded-md bg-blue-50 border border-blue-100">
                      <span className="font-semibold text-blue-800 block">Task:</span>
                      <span className="text-blue-700 truncate block font-medium">{bullet.formulaBreakdown.task}</span>
                    </div>
                    <div className="p-1.5 rounded-md bg-purple-50 border border-purple-100">
                      <span className="font-semibold text-purple-800 block">Tool / Method:</span>
                      <span className="text-purple-700 truncate block font-medium">{bullet.formulaBreakdown.toolMethod}</span>
                    </div>
                    <div className="p-1.5 rounded-md bg-amber-50 border border-amber-100">
                      <span className="font-semibold text-amber-800 block">Quantified Result:</span>
                      <span className="text-amber-700 truncate block font-medium">{bullet.formulaBreakdown.quantifiedResult}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    <span className="font-semibold text-slate-700">Recruiter Notes:</span> {bullet.recruiterNotes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: SKILL GAP ROADMAP */}
      {(activeTab === 'all' || activeTab === 'roadmap') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                7
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">SKILL GAP ROADMAP</h3>
            </div>
            <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              Prioritized Learning Path
            </span>
          </div>

          <div className="space-y-3">
            {result.skillGapRoadmap.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{item.skill}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.priority === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : item.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.priority} Priority
                    </span>
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.realisticTimeline}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 pl-8">
                  <span className="font-semibold text-slate-900">Target Competency:</span> {item.targetCompetency}
                </div>

                <div className="pl-8 pt-1">
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Suggested High-Impact Resources:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.suggestedResources.map((res, rIdx) => (
                      <span
                        key={rIdx}
                        className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[11px] text-slate-700 flex items-center gap-1 shadow-2xs"
                      >
                        <BookOpen className="w-3 h-3 text-indigo-500" />
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
