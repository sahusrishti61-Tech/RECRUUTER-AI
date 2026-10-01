import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, RefreshCw, ArrowRight, Wand2, Lightbulb } from 'lucide-react';
import { BulletVariation } from '../types/recruiter';

interface InteractiveRewriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBullet?: string;
  targetRole?: string;
}

export const InteractiveRewriterModal: React.FC<InteractiveRewriterModalProps> = ({
  isOpen,
  onClose,
  defaultBullet = '',
  targetRole = 'Data Analyst at a mid-size fintech company',
}) => {
  const [bulletText, setBulletText] = useState(defaultBullet);
  const [role, setRole] = useState(targetRole);
  const [focusAngle, setFocusAngle] = useState<'metrics' | 'technical' | 'leadership'>('metrics');
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<BulletVariation[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRewrite = async () => {
    if (!bulletText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/rewrite-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulletText,
          targetRole: role,
          focus:
            focusAngle === 'metrics'
              ? 'Quantified Business Metrics & ROI'
              : focusAngle === 'technical'
              ? 'Technical Tool Mastery & Scalable Architecture'
              : 'Leadership, Ownership & Cross-Functional Impact',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to rewrite');
      setVariations(data.variations || []);
    } catch (err: any) {
      setError(err.message || 'Error rewriting bullet.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleWeakBullets = [
    'Responsible for running SQL queries to produce daily reports for the finance team.',
    'Worked on building dashboards in Tableau for tracking loan applications.',
    'Helped improve system performance and fixed bugs in the codebase.',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Bullet Rewriter Studio</h3>
              <p className="text-xs text-slate-500">
                Formula: <span className="font-mono text-indigo-700 font-semibold">Action Verb + Task + Tool/Method + Quantified Result</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="py-4 space-y-4 overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Current Resume Bullet Point (or choose a sample):
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {sampleWeakBullets.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setBulletText(sample)}
                  className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors truncate max-w-xs"
                  title={sample}
                >
                  &quot;{sample.slice(0, 38)}...&quot;
                </button>
              ))}
            </div>
            <textarea
              value={bulletText}
              onChange={(e) => setBulletText(e.target.value)}
              placeholder="e.g., Responsible for updating financial models in Excel and analyzing quarterly revenue numbers."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Role Benchmark:
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Data Analyst at Fintech"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Emphasis Angle:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'metrics', label: '📊 Metrics & ROI' },
                  { id: 'technical', label: '⚙️ Tech Depth' },
                  { id: 'leadership', label: '🚀 Leadership' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFocusAngle(item.id as any)}
                    className={`text-[11px] py-2 px-1 rounded-lg font-medium border text-center transition-all ${
                      focusAngle === item.id
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-2xs font-semibold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleRewrite}
            disabled={loading || !bulletText.trim()}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Applying 15-Yr Recruiter Formula...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate 3 Recruiter-Grade Variations</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}

          {/* Results List */}
          {variations.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Recruiter Variations (Gold Standard):
              </h4>
              {variations.map((v, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-indigo-50/20 hover:border-indigo-200 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                      {v.angle}
                    </span>
                    <button
                      onClick={() => copyToClipboard(v.rewritten, idx)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-indigo-600 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs transition-colors"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Bullet</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-slate-900 leading-relaxed pl-2 border-l-2 border-indigo-500">
                    &bull; {v.rewritten}
                  </p>

                  {/* Formula Breakdown Tags */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] pt-1">
                    <div className="p-1.5 rounded-md bg-emerald-50 border border-emerald-100">
                      <span className="font-semibold text-emerald-800 block">Action Verb:</span>
                      <span className="text-emerald-700 font-mono">{v.actionVerb}</span>
                    </div>
                    <div className="p-1.5 rounded-md bg-blue-50 border border-blue-100">
                      <span className="font-semibold text-blue-800 block">Task:</span>
                      <span className="text-blue-700 truncate block">{v.task}</span>
                    </div>
                    <div className="p-1.5 rounded-md bg-purple-50 border border-purple-100">
                      <span className="font-semibold text-purple-800 block">Tool / Method:</span>
                      <span className="text-purple-700 truncate block">{v.toolMethod}</span>
                    </div>
                    <div className="p-1.5 rounded-md bg-amber-50 border border-amber-100">
                      <span className="font-semibold text-amber-800 block">Quantified Result:</span>
                      <span className="text-amber-700 truncate block">{v.quantifiedResult}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    <span className="font-semibold text-slate-600">Recruiter Takeaway:</span> {v.recruiterTakeaway}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
