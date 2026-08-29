import React from 'react';
import { Eye, AlertTriangle, X, ShieldAlert } from 'lucide-react';

export default function EvidenceModal({ isOpen, onClose, analysis }) {
  if (!isOpen || !analysis) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-slate-100 relative animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900">Inspection Evidence</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Image with Annotated Visual Highlights */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 mb-4 bg-slate-900 group">
          <img 
            src={analysis.image} 
            alt={analysis.name}
            className="w-full h-48 object-cover opacity-90" 
          />
          
          {/* Simulated OCR Detection Annotations */}
          {analysis.status === 'NON-COMPLIANT' && (
            <>
              {/* Box 1: MRP Missing */}
              <div className="absolute top-4 left-6 border-2 border-rose-500 bg-rose-500/20 rounded p-1 shadow-lg animate-pulse">
                <span className="bg-rose-600 text-white text-[9px] font-bold px-1 rounded">1. MRP Missing</span>
              </div>
              {/* Box 2: Country of Origin */}
              <div className="absolute bottom-6 left-12 border-2 border-rose-500 bg-rose-500/20 rounded p-1 shadow-lg">
                <span className="bg-rose-600 text-white text-[9px] font-bold px-1 rounded">2. Country of Origin</span>
              </div>
              {/* Box 3: Readability */}
              <div className="absolute top-16 right-6 border-2 border-amber-500 bg-amber-500/20 rounded p-1 shadow-lg">
                <span className="bg-amber-600 text-white text-[9px] font-bold px-1 rounded">3. Font Height &lt; 1.5mm</span>
              </div>
            </>
          )}

          <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded font-mono">
            {analysis.id}
          </div>
        </div>

        {/* Key Findings List */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Annotated Infractions</h4>
          {analysis.violationsList?.length > 0 ? (
            analysis.violationsList.map((v, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-rose-900">{v.title}</h5>
                  <p className="text-[11px] text-rose-700 mt-0.5 leading-tight">{v.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-medium">
              No evidence of non-compliance found. All mandatory declarations verified under Legal Metrology Rules, 2011.
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-950 text-white text-xs font-semibold rounded-xl"
        >
          Close Evidence Viewer
        </button>
      </div>
    </div>
  );
}
