import React from 'react';
import { Award, Sparkles, CheckCircle2, ShieldAlert, FileText, Compass, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onOpenRewriter: () => void;
  onOpenRubric: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRewriter, onOpenRubric }) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 ring-2 ring-indigo-50">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">RecruiterAI</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Sparkles className="w-3 h-3 text-indigo-600" /> 15+ Yrs Recruiter Lens
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Technical resume screening, ATS keyword auditing, quantified bullet rewriting & skill gap roadmaps
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenRewriter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bullet Rewriter Studio</span>
          </button>

          <button
            onClick={onOpenRubric}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Evaluation Rubric</span>
          </button>
        </div>
      </div>
    </header>
  );
};
