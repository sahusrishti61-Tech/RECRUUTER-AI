import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Briefcase,
  Layers,
  FileCode,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  UploadCloud,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PRESET_SCENARIOS, PresetScenario } from '../data/presets';

interface InputPanelProps {
  resume: string;
  setResume: (val: string) => void;
  targetRole: string;
  setTargetRole: (val: string) => void;
  experienceLevel: string;
  setExperienceLevel: (val: string) => void;
  jobDescription: string;
  setJobDescription: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  resume,
  setResume,
  targetRole,
  setTargetRole,
  experienceLevel,
  setExperienceLevel,
  jobDescription,
  setJobDescription,
  onAnalyze,
  isLoading,
}) => {
  const [showJd, setShowJd] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('data-analyst-fintech');

  const wordCount = resume.trim() ? resume.trim().split(/\s+/).length : 0;

  const handleApplyPreset = (scenario: PresetScenario) => {
    setSelectedPresetId(scenario.id);
    setResume(scenario.resume);
    setTargetRole(scenario.targetRole);
    setExperienceLevel(scenario.experienceLevel);
    setJobDescription(scenario.jobDescription);
    if (scenario.jobDescription) setShowJd(true);
  };

  const experienceLevels = [
    { id: 'Entry-level', label: 'Entry-Level', sub: '0-2 Yrs' },
    { id: 'Mid-Level', label: 'Mid-Level', sub: '3-5 Yrs' },
    { id: 'Senior', label: 'Senior', sub: '6-8 Yrs' },
    { id: 'Staff / Lead', label: 'Staff / Lead', sub: '9+ Yrs' },
    { id: 'Executive', label: 'Executive', sub: 'Dir / VP' },
  ];

  const quickRoles = [
    'Data Analyst at a mid-size fintech company',
    'Senior Full-Stack Engineer (React / Node.js)',
    'Machine Learning / AI Engineer',
    'Product Manager (B2B SaaS)',
    'DevOps / Cloud Platform Engineer',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setResume(text);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-6">
      {/* Preset Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            1-Click Candidate Scenarios (Instant Demo)
          </span>
          <span className="text-[11px] text-slate-500">
            Pre-loaded with real tech resumes and job requirements
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESET_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => handleApplyPreset(scenario)}
              className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                selectedPresetId === scenario.id
                  ? 'bg-indigo-50/70 border-indigo-300 text-indigo-950 ring-1 ring-indigo-200'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-900 truncate">{scenario.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-indigo-100/70 text-indigo-800">
                  {scenario.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">{scenario.targetRole}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Target Role & Level */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              Target Role & Company Type
            </span>
            <span className="text-[11px] font-normal text-slate-500">e.g. Data Analyst at mid-size fintech</span>
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Data Analyst at a mid-size fintech company"
            className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          {/* Quick role suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 font-medium">Quick suggestions:</span>
            {quickRoles.map((role, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTargetRole(role)}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 transition-colors"
              >
                {role.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            Experience Level
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1.5">
            {experienceLevels.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setExperienceLevel(lvl.id)}
                className={`text-left p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                  experienceLevel === lvl.id
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="leading-tight">{lvl.label}</div>
                <div className={`text-[10px] ${experienceLevel === lvl.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {lvl.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Input Area */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            Candidate Resume Content (Text / Markdown)
          </label>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {wordCount} words
            </span>
            <label className="cursor-pointer text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 text-xs">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Import .txt / .md</span>
              <input
                type="file"
                accept=".txt,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {resume.trim() && (
              <button
                type="button"
                onClick={() => setResume('')}
                className="text-slate-400 hover:text-red-600 flex items-center gap-1"
                title="Clear resume"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste candidate resume text here (experience, summary, skills, education)..."
          rows={10}
          className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono leading-relaxed bg-slate-50/40 text-slate-900"
        />
      </div>

      {/* Optional Job Description Accordion */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowJd(!showJd)}
          className="w-full p-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-slate-500" />
            <span>Target Job Description (Optional — for exact ATS keyword match % audit)</span>
            {jobDescription.trim() && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                JD Attached
              </span>
            )}
          </div>
          {showJd ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {showJd && (
          <div className="p-3.5 bg-white border-t border-slate-200 space-y-2">
            <p className="text-[11px] text-slate-500">
              When a job description is provided, the recruiter engine will calculate an exact ATS keyword match percentage, identify missing hard skills, and pinpoint missed qualification requirements.
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste full job description requirements and responsibilities here..."
              rows={5}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans text-slate-900"
            />
          </div>
        )}
      </div>

      {/* CTA Submit Button */}
      <div className="pt-2">
        <button
          onClick={onAnalyze}
          disabled={isLoading || resume.trim().length < 20}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 hover:from-indigo-800 hover:to-blue-700 text-white text-sm font-bold shadow-md shadow-indigo-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Screening Resume with 15-Year Recruiter Lens...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Run Full Recruiter Screening & Career Audit</span>
            </div>
          )}
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2">
          Strictly enforces: Specific & honest critique &bull; Quoted weak bullets &bull; ATS keyword audit &bull; Quantified formula rewrites &bull; Skill gap roadmap
        </p>
      </div>
    </div>
  );
};
