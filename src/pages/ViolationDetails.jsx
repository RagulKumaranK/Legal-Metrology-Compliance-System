import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ZoomIn, Download, AlertCircle, Gavel, Flag, CheckCircle2, ShieldAlert
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ReportModal from '../components/Modals/ReportModal';
import { useAuthInspection } from '../context/AuthInspectionContext';
import { DEMO_SCAN_QUEUE } from '../data/mockInspections';

export default function ViolationDetails() {
  const navigate = useNavigate();
  const { activeAnalysis, officer, capturedImage } = useAuthInspection();

  const defaultItem = DEMO_SCAN_QUEUE[0];
  const analysis = activeAnalysis || defaultItem;

  const [isZoomed, setIsZoomed] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [markedForReview, setMarkedForReview] = useState(false);

  const rawPhoto = analysis.rawImage || capturedImage || defaultItem.rawImage || analysis.image;
  const processedPhoto = analysis.processedImage || defaultItem.processedImage || rawPhoto;

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fc] text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">
      
      <Header showBack={true} onBack={() => navigate(-1)} />

      {/* Main Content Body */}
      <div className="flex-1 p-4 pb-24 space-y-4 overflow-y-auto">
        
        {/* Title Header with Non-Compliant Badge */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Violation<br />Details
            </h2>
          </div>

          <div className="bg-[#ffe4e4] border border-rose-400/80 text-rose-700 text-xs font-extrabold px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xs uppercase tracking-tight">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>NON-COMPLIANT</span>
          </div>
        </div>

        {/* Evidence Capture Card Box */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-md overflow-hidden text-slate-100">
          
          <div className="bg-[#dce7fc] px-4 py-2.5 flex justify-between items-center text-slate-900 border-b border-blue-200">
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Evidence Capture
            </span>
            <div className="flex items-center gap-2 text-slate-700">
              <button 
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-1 hover:text-slate-950 transition-colors"
                title="Zoom evidence"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                className="p-1 hover:text-slate-950 transition-colors"
                title="Download frame"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Box */}
          <div className="relative p-4 bg-[#0a0d14] flex items-center justify-center min-h-[220px]">
            <div className={`relative transition-all duration-300 ${
              isZoomed ? 'scale-125 z-10' : 'scale-100'
            }`}>
              <img 
                src={processedPhoto} 
                alt="Violation Frame" 
                className="max-h-[260px] w-auto object-contain rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultItem.image;
                }}
              />

              {/* Red Bounding Box Overlay for Violation 01 */}
              <div className="absolute top-[18%] left-[20%] right-[15%] h-16 border-2 border-rose-600 bg-rose-600/10 rounded flex flex-col justify-start p-1 animate-pulse">
                <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded font-mono w-max shadow">
                  VIOLATION 01
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Violation 01 Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-extrabold text-xs">
              !
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Violation 01
            </h3>
          </div>

          <div className="space-y-3 divide-y divide-slate-100 text-xs">
            
            {/* Field 1: Violation Type */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                VIOLATION TYPE
              </span>
              <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                MRP Declaration
              </span>
            </div>

            {/* Field 2: Detected Text */}
            <div className="pt-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-1">
                DETECTED TEXT
              </span>
              <span className="inline-block px-3 py-1 bg-[#eef4ff] border border-blue-200 text-blue-950 font-mono font-extrabold text-xs rounded-xl shadow-2xs">
                'MRP ₹30.00'
              </span>
            </div>

            {/* Field 3: Issue Description */}
            <div className="pt-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-1.5">
                ISSUE DESCRIPTION
              </span>
              <div className="p-3 bg-[#fff1f1] border border-rose-200 rounded-xl text-xs text-rose-950 leading-relaxed font-sans">
                Does not satisfy required format as per Legal Metrology regulations. The format detected lacks standard spacing or mandatory suffix.
              </div>
            </div>

            {/* Field 4: Reference & Severity Row */}
            <div className="pt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  RULE REFERENCE
                </span>
                <span className="text-xs font-extrabold text-slate-900 font-mono">
                  Rule 6(1)
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  SEVERITY
                </span>
                <span className="text-xs font-black text-rose-600 uppercase flex items-center gap-1 font-mono">
                  <span className="font-extrabold">!</span> HIGH
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Required Actions Container Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 tracking-wider">
            Required Actions
          </h3>

          <div className="space-y-2">
            <button
              onClick={() => setShowNoticeModal(true)}
              className="w-full py-3 bg-[#0c1322] hover:bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Gavel className="w-4 h-4 text-amber-400" />
              <span>Initiate Notice</span>
            </button>

            <button
              onClick={() => setMarkedForReview(!markedForReview)}
              className={`w-full py-3 border font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${
                markedForReview
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Flag className={`w-4 h-4 ${markedForReview ? 'text-amber-600 fill-amber-600' : 'text-slate-500'}`} />
              <span>{markedForReview ? 'Marked for Escalated Review' : 'Mark for Review'}</span>
            </button>
          </div>
        </div>

      </div>

      <ReportModal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        analysis={analysis}
        officer={officer}
      />

      <BottomNav />

    </div>
  );
}
