import React, { useState } from 'react';
import { Eye, AlertTriangle, X, ShieldAlert, Clock, Layers } from 'lucide-react';

export default function EvidenceModal({ isOpen, onClose, analysis }) {
  const [activeTab, setActiveTab] = useState('PROCESSED'); // 'RAW' or 'PROCESSED'

  if (!isOpen || !analysis) return null;

  const rawPhoto = analysis.rawImage || analysis.image;
  const processedPhoto = analysis.processedImage || rawPhoto;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-slate-800 relative animate-in zoom-in-95 duration-200 text-slate-100">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="text-sm font-bold text-white">Visual Audit Evidence</h3>
              <p className="text-[10px] font-mono text-slate-400">Ref: {analysis.id} • Audit Time: {analysis.processingTime || '22.4'}s</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Taken vs Processed Toggle Selector */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono mb-3">
          <button
            onClick={() => setActiveTab('RAW')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'RAW' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Taken Photo (Raw)
          </button>
          <button
            onClick={() => setActiveTab('PROCESSED')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'PROCESSED' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Processed Vision LLM
          </button>
        </div>

        {/* Product Image Frame - 3:4 Ratio */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 mb-4 bg-slate-950 w-full max-w-[260px] aspect-[3/4] mx-auto flex items-center justify-center group shadow-lg">
          <img 
            src={activeTab === 'RAW' ? rawPhoto : processedPhoto} 
            alt={analysis.name}
            className="w-full h-full object-cover" 
          />
          
          {/* Simulated Vision LLM Detection Bounding Annotations on Processed View */}
          {activeTab === 'PROCESSED' && analysis.status === 'NON-COMPLIANT' && (
            <>
              {/* Box 1: MRP Missing */}
              <div className="absolute top-4 left-6 border-2 border-rose-500 bg-rose-500/20 rounded p-1 shadow-lg animate-pulse">
                <span className="bg-rose-600 text-white text-[9px] font-bold px-1 rounded font-mono">1. MRP Missing</span>
              </div>
              {/* Box 2: Country of Origin */}
              <div className="absolute bottom-6 left-10 border-2 border-rose-500 bg-rose-500/20 rounded p-1 shadow-lg">
                <span className="bg-rose-600 text-white text-[9px] font-bold px-1 rounded font-mono">2. Country of Origin</span>
              </div>
              {/* Box 3: Readability */}
              <div className="absolute top-16 right-6 border-2 border-amber-500 bg-amber-500/20 rounded p-1 shadow-lg">
                <span className="bg-amber-600 text-white text-[9px] font-bold px-1 rounded font-mono">3. Font &lt; 1.5mm</span>
              </div>
            </>
          )}

          <div className="absolute bottom-2 right-2 bg-slate-950/90 text-slate-300 text-[9px] px-2 py-0.5 rounded font-mono border border-slate-800">
            {activeTab === 'RAW' ? '📷 ORIGINAL CAMERA CAPTURE' : '🔍 ANNOTATED VISION LLM MESH'}
          </div>
        </div>

        {/* Key Findings List */}
        <div className="space-y-2 mb-5">
          <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Annotated Rule Infractions</h4>
          {analysis.violationsList?.length > 0 ? (
            analysis.violationsList.map((v, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-900/60 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded bg-rose-900 text-rose-200 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-rose-700">
                  {i + 1}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-rose-300">{v.title}</h5>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-tight">{v.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 font-medium">
              No infractions detected. All 12 mandatory package declarations verified under Legal Metrology Rules, 2011.
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
        >
          Close Evidence Inspector
        </button>
      </div>
    </div>
  );
}
