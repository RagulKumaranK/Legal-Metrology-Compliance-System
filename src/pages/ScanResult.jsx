import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, AlertCircle, FileText, Eye, Download, CheckCircle2, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import EvidenceModal from '../components/Modals/EvidenceModal';
import ReportModal from '../components/Modals/ReportModal';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function ScanResult() {
  const navigate = useNavigate();
  const { activeAnalysis, officer } = useAuthInspection();

  const [analyzing, setAnalyzing] = useState(true);
  const [analyzingStep, setAnalyzingStep] = useState('Extracting OCR Text...');
  const [showEvidence, setShowEvidence] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Fallback default analysis if accessed directly
  const analysis = activeAnalysis || {
    id: "INS-2026-003",
    name: "Tata Salt Iodised",
    netQuantity: "1 kg",
    date: "05 Sep 2026",
    time: "10:32 AM",
    status: "NON-COMPLIANT",
    complianceScore: 72,
    checks: { total: 12, passed: 8, violations: 3, warnings: 1 },
    violationsList: [
      { id: 1, title: "MRP Declaration", desc: "MRP not declared on the product." },
      { id: 2, title: "Mandatory Declaration", desc: "Country of Origin is missing." },
      { id: 3, title: "Readability", desc: "Text is not clearly readable." }
    ],
    image: "https://images.unsplash.com/photo-1626197031507-c170a045c697?auto=format&fit=crop&w=400&q=80"
  };

  useEffect(() => {
    // Simulated step-by-step analysis sequence
    setAnalyzing(true);
    const t1 = setTimeout(() => setAnalyzingStep('Extracting OCR Declarations...'), 400);
    const t2 = setTimeout(() => setAnalyzingStep('Verifying Legal Metrology Rules, 2011...'), 800);
    const t3 = setTimeout(() => setAnalyzing(false), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeAnalysis]);

  const isCompliant = analysis.status === 'COMPLIANT';

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <Header 
        title="Analysis Result" 
        showBack={true} 
        onBack={() => navigate('/dashboard')} 
      />

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {analyzing ? (
          /* Step-by-step Analysis Loading Screen */
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md text-center my-8 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-900 mx-auto flex items-center justify-center mb-4 border border-blue-100">
              <FileText className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Analyzing Commodity Label</h3>
            <p className="text-xs font-semibold text-blue-900">{analyzingStep}</p>
          </div>
        ) : (
          <>
            {/* Top Product Summary Card */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <img 
                src={analysis.image} 
                alt={analysis.name} 
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-slate-900 truncate">{analysis.name}</h2>
                <p className="text-[11px] text-slate-500 font-medium">{analysis.netQuantity}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Captured on {analysis.date} • {analysis.time}</p>
              </div>
            </div>

            {/* Compliance Status & Score Banner */}
            <div className={`p-4 rounded-2xl border shadow-md flex items-center justify-between ${
              isCompliant ? 'bg-emerald-50/80 border-emerald-200' : 'bg-rose-50/80 border-rose-200'
            }`}>
              <div>
                <span className={`text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase border shadow-xs ${
                  isCompliant ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-rose-600 text-white border-rose-500'
                }`}>
                  {analysis.status}
                </span>
                <p className={`text-[11px] font-bold mt-2.5 ${isCompliant ? 'text-emerald-800' : 'text-rose-800'}`}>
                  Compliance Score
                </p>
              </div>

              {/* Compliance Percentage Circular Gauge */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={isCompliant ? "text-emerald-600" : "text-rose-600"}
                    strokeDasharray={`${analysis.complianceScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className={`absolute text-sm font-black font-mono ${isCompliant ? 'text-emerald-900' : 'text-rose-900'}`}>
                  {analysis.complianceScore}%
                </span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-4 gap-2 text-center divide-x divide-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Checks</p>
                  <p className="text-base font-black text-slate-900 mt-1">{analysis.checks.total}</p>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-600 font-semibold uppercase">Passed</p>
                  <p className="text-base font-black text-emerald-700 mt-1">{analysis.checks.passed}</p>
                </div>
                <div>
                  <p className="text-[10px] text-rose-600 font-semibold uppercase">Violations</p>
                  <p className="text-base font-black text-rose-700 mt-1">{analysis.checks.violations}</p>
                </div>
                <div>
                  <p className="text-[10px] text-amber-600 font-semibold uppercase">Warnings</p>
                  <p className="text-base font-black text-amber-700 mt-1">{analysis.checks.warnings}</p>
                </div>
              </div>
            </div>

            {/* Top Violations Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Top Violations</h3>
                <button onClick={() => setShowEvidence(true)} className="text-xs font-bold text-blue-900 hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-2">
                {analysis.violationsList && analysis.violationsList.length > 0 ? (
                  analysis.violationsList.map((item, idx) => (
                    <div 
                      key={item.id || idx}
                      className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-emerald-900">Fully Compliant</p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">All 12 Legal Metrology mandatory declarations are present and valid.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowEvidence(true)}
                className="flex-1 py-3 px-3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
              >
                <Eye className="w-4 h-4 text-blue-900" />
                <span>View Evidence</span>
              </button>

              <button
                onClick={() => setShowReport(true)}
                className="flex-1 py-3 px-3 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </>
        )}

      </div>

      {/* Modals */}
      <EvidenceModal
        isOpen={showEvidence}
        onClose={() => setShowEvidence(false)}
        analysis={analysis}
      />
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        analysis={analysis}
        officer={officer}
      />

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
