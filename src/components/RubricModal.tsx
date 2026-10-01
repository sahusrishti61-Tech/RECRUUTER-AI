import React from 'react';
import { X, CheckCircle, ShieldAlert, Award, FileSearch, ArrowRight } from 'lucide-react';

interface RubricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RubricModal: React.FC<RubricModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Technical Recruiter Evaluation Rubric</h3>
              <p className="text-xs text-slate-500">Based on 15+ years of screening resumes across tech and finance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs text-slate-600">
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Core Recruiter Rules Enforced
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li><strong className="text-slate-800">Candid & Specific:</strong> No generic flattery. Every critique explains why a bullet point fails to pass a 6-second recruiter screen.</li>
              <li><strong className="text-slate-800">Verbatim Quotes:</strong> Exact lines from the resume are quoted directly when pointing out weaknesses or vague phrasing.</li>
              <li><strong className="text-slate-800">No Fabrication:</strong> The evaluator never invents numbers, company names, or accomplishments the candidate did not mention.</li>
              <li><strong className="text-slate-800">Inquiry Over Guessing:</strong> If team size, budget, or timelines are omitted, questions are explicitly raised for the candidate to fill in.</li>
            </ul>
          </div>

          <div className="bg-indigo-50/70 rounded-xl p-3.5 border border-indigo-100">
            <h4 className="font-semibold text-indigo-950 mb-1.5 flex items-center gap-1.5">
              <FileSearch className="w-4 h-4 text-indigo-700" />
              The Recruiter-Grade Bullet Formula
            </h4>
            <div className="p-2.5 bg-white rounded-lg border border-indigo-200 font-mono text-[11px] text-indigo-900 font-medium">
              Action Verb + Task + Tool / Method + Quantified Result
            </div>
            <p className="mt-2 text-indigo-800 leading-relaxed">
              Every rewritten bullet must replace passive phrases (&quot;Responsible for&quot;, &quot;Worked on&quot;, &quot;Helped with&quot;) with decisive verbs, clear technical architecture, and measurable business impact (% latency reduced, $ saved, hours reclaimed).
            </p>
          </div>

          <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-100">
            <h4 className="font-semibold text-amber-950 mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              ATS & Parsing Criteria
            </h4>
            <p className="text-amber-900 leading-relaxed">
              Resumes are audited for keyword density against industry role standards or the optional job description, two-column table traps, non-standard section titles, and missing hard skills.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Understood, Let&apos;s Review
          </button>
        </div>
      </div>
    </div>
  );
};
