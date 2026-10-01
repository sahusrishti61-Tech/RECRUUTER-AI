/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { AnalysisResults } from './components/AnalysisResults';
import { RubricModal } from './components/RubricModal';
import { InteractiveRewriterModal } from './components/InteractiveRewriterModal';
import { ExportModal } from './components/ExportModal';
import { PRESET_SCENARIOS } from './data/presets';
import { ResumeAnalysisResult } from './types/recruiter';
import { AlertCircle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const initialPreset = PRESET_SCENARIOS[0]; // Jordan Lee - Data Analyst at a mid-size fintech company

  const [resume, setResume] = useState(initialPreset.resume);
  const [targetRole, setTargetRole] = useState(initialPreset.targetRole);
  const [experienceLevel, setExperienceLevel] = useState(initialPreset.experienceLevel);
  const [jobDescription, setJobDescription] = useState(initialPreset.jobDescription);

  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isRubricOpen, setIsRubricOpen] = useState(false);
  const [isRewriterOpen, setIsRewriterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [rewriterBullet, setRewriterBullet] = useState<string>('');

  const handleAnalyze = async () => {
    if (!resume.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume,
          targetRole,
          experienceLevel,
          jobDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || 'Failed to analyze resume');
      }

      const data: ResumeAnalysisResult = await response.json();
      setAnalysisResult(data);

      // Scroll smoothly to results
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Something went wrong during screening.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenRewriterWithBullet = (bullet: string) => {
    setRewriterBullet(bullet);
    setIsRewriterOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      <Header
        onOpenRewriter={() => {
          setRewriterBullet('');
          setIsRewriterOpen(true);
        }}
        onOpenRubric={() => setIsRubricOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8">
        {/* Recruiter Persona Intro Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                15+ Year Technical Recruiter & Career Coach Persona
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Provides uncompromising, specific, and evidence-based screening. Weak bullet points are quoted verbatim, quantified formula rewrites are drafted instantly, and missing skills are mapped to realistic career timelines.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              No Fake Metrics
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Formula Enforced
            </span>
          </div>
        </div>

        {/* Input Panel */}
        <InputPanel
          resume={resume}
          setResume={setResume}
          targetRole={targetRole}
          setTargetRole={setTargetRole}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <div>
              <span className="font-bold">Screening Failed: </span>
              {error}
            </div>
          </div>
        )}

        {/* Results Section */}
        {analysisResult && (
          <div id="results-section" className="pt-2">
            <AnalysisResults
              result={analysisResult}
              targetRole={targetRole}
              experienceLevel={experienceLevel}
              onOpenRewriterWithBullet={handleOpenRewriterWithBullet}
              onOpenExport={() => setIsExportOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            RecruiterAI &bull; Technical Recruiter & Career Coach Assessment Engine
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Gemini 3.8 Flash</span>
            <span>&bull;</span>
            <span>Zero Flattery Rubric</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RubricModal isOpen={isRubricOpen} onClose={() => setIsRubricOpen(false)} />

      <InteractiveRewriterModal
        isOpen={isRewriterOpen}
        onClose={() => setIsRewriterOpen(false)}
        defaultBullet={rewriterBullet}
        targetRole={targetRole}
      />

      {analysisResult && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          result={analysisResult}
          targetRole={targetRole}
          experienceLevel={experienceLevel}
        />
      )}
    </div>
  );
}
