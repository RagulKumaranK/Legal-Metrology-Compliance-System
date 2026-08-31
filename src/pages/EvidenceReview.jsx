import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ZoomIn, Scan, Plus, Sliders, Contrast,
  AlertCircle, CheckCircle2, AlertTriangle, FileText
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import AddEvidenceModal from '../components/Modals/AddEvidenceModal';
import ReportModal from '../components/Modals/ReportModal';
import { useAuthInspection } from '../context/AuthInspectionContext';
import { DEMO_SCAN_QUEUE } from '../data/mockInspections';

export default function EvidenceReview() {
  const navigate = useNavigate();
  const { activeAnalysis, officer, capturedImage } = useAuthInspection();

  const defaultItem = DEMO_SCAN_QUEUE[0];
  const analysis = activeAnalysis || defaultItem;

  const [activeTab, setActiveTab] = useState('ORIGINAL');
  const [isZoomed, setIsZoomed] = useState(false);
  const [showOcrOverlay, setShowOcrOverlay] = useState(true);
  const [contrastMode, setContrastMode] = useState(false);
  const [showAddEvidence, setShowAddEvidence] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [attachedEvidences, setAttachedEvidences] = useState([]);

  const rawPhoto = analysis.rawImage || capturedImage || defaultItem.rawImage || analysis.image;
  const processedPhoto = analysis.processedImage || defaultItem.processedImage || rawPhoto;

  const handleAddEvidenceSuccess = (newEv) => {
    setAttachedEvidences(prev => [newEv, ...prev]);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">

      <Header showBack={true} onBack={() => navigate(-1)} />

      {/* Main Content Area */}
      <div className="flex-1 p-4 pb-24 space-y-4 overflow-y-auto">



        {/* Toolbar Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${isZoomed
              ? 'bg-slate-800 border-slate-900 text-white'
              : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>ZOOM</span>
          </button>

          <button
            onClick={() => setShowOcrOverlay(!showOcrOverlay)}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${showOcrOverlay
              ? 'bg-slate-800 border-slate-900 text-white'
              : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>VISION LLM</span>
          </button>

          <button
            onClick={() => setShowAddEvidence(true)}
            className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all uppercase tracking-wider"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>ADD EVIDENCE</span>
          </button>
        </div>

        {/* Media Frame Panel */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden text-slate-100 shadow-lg">

          {/* Tab Header Strip */}
          <div className="bg-slate-800 grid grid-cols-3 text-center text-xs font-mono border-b border-slate-700">
            {[
              { id: 'ORIGINAL', label: 'ORIGINAL' },
              { id: 'PROCESSED', label: 'PROCESSED' },
              { id: 'OCR', label: 'VISION LLM' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2.5 font-bold transition-colors ${isActive ? 'bg-slate-900 text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Canvas Area */}
          <div className="relative p-4 bg-slate-950 flex items-center justify-center min-h-[280px] overflow-hidden">
            <div className={`relative transition-all duration-200 w-full flex justify-center ${isZoomed ? 'scale-125 z-10' : 'scale-100'
              }`}>
              <img
                src={activeTab === 'ORIGINAL' ? rawPhoto : processedPhoto}
                alt="Evidence Packaging Scan"
                className={`max-h-[320px] w-auto object-contain rounded-xl border border-slate-800 ${contrastMode ? 'contrast-200 brightness-110 saturate-0' : ''
                  }`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultItem.image;
                }}
              />
            </div>
          </div>

          {/* Canvas Status Line */}
          <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span>W: 2400px</span>
              <span>H: 3600px</span>
              <span>STATUS: {analysis.status}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setContrastMode(!contrastMode)}
                className={`p-1 rounded hover:bg-slate-800 transition-colors ${contrastMode ? 'text-amber-400' : 'text-slate-400'
                  }`}
                title="Contrast Mode"
              >
                <Contrast className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-1 rounded text-slate-400 hover:bg-slate-800 transition-colors"
                title="Controls"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Officer Attached Evidences (If any) */}
        {attachedEvidences.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Officer Attached Evidences ({attachedEvidences.length})</span>
            </h4>
            <div className="space-y-1.5">
              {attachedEvidences.map((ev, i) => (
                <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{ev.name}</span>
                    <p className="text-[10px] text-slate-500 font-mono">{ev.type} • {new Date(ev.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">VERIFIED</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extracted Data Section */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden space-y-3 shadow-sm">

          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 font-mono">
              Extracted Legal Metrology Declarations
            </h3>
            <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full border border-blue-200">
              {analysis.fontSizeAnalysis?.length || 10} FIELDS DETECTED
            </span>
          </div>

          <div className="p-4 space-y-3">
            {analysis.fontSizeAnalysis ? (
              analysis.fontSizeAnalysis.map((item, idx) => {
                const isPass = item.status === 'PASS';
                const isReview = item.status === 'REVIEW';
                return (
                  <div
                    key={idx}
                    className={`border rounded-xl p-3.5 space-y-1.5 transition-all ${isPass
                      ? 'bg-white border-slate-200'
                      : isReview
                        ? 'bg-amber-50/70 border-amber-200'
                        : 'bg-rose-50/70 border-rose-200'
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                        {item.field}
                      </span>
                      {isPass ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : isReview ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </div>

                    <p className={`text-xs font-extrabold font-mono leading-snug ${isPass ? 'text-slate-900' : isReview ? 'text-amber-900' : 'text-rose-900'
                      }`}>
                      {item.value}
                    </p>

                    <div className="flex justify-between items-center text-[10px] font-mono pt-1.5 border-t border-slate-100 text-slate-500">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold border border-slate-200">
                        {item.rule}
                      </span>
                      <span>
                        {item.measuredSize ? `Size: ${item.measuredSize}` : `Status: ${item.status}`}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Fallback extracted fields mapping from ocrExtracted */
              Object.entries(analysis.ocrExtracted || {}).map(([key, val], idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">{key}</span>
                  <p className="text-xs font-bold text-slate-900 font-mono">{String(val)}</p>
                </div>
              ))
            )}
          </div>

          {/* Action Button */}
          <div className="p-4 pt-0">
            <button
              onClick={() => setShowReport(true)}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition-all uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
            >
              <FileText className="w-4 h-4" />
              <span>GENERATE OFFICIAL REPORT</span>
            </button>
          </div>

        </div>

      </div>

      {/* Modals */}
      <AddEvidenceModal
        isOpen={showAddEvidence}
        onClose={() => setShowAddEvidence(false)}
        onAddEvidence={handleAddEvidenceSuccess}
      />
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        analysis={analysis}
        officer={officer}
      />

      <BottomNav />

    </div>
  );
}
