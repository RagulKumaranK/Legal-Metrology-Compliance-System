import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function ScanPreview() {
  const navigate = useNavigate();
  const { capturedImage, activeAnalysis, generateScanAnalysis } = useAuthInspection();

  const previewImage = capturedImage || activeAnalysis?.image || 'https://images.unsplash.com/photo-1626197031507-c170a045c697?auto=format&fit=crop&w=800&q=80';
  const productName = activeAnalysis?.name || "Surf Excel Easy Wash";

  const handleContinue = () => {
    if (!activeAnalysis) {
      generateScanAnalysis(productName, previewImage);
    }
    navigate('/scan-result');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fc] text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">
      
      <Header showBack={true} onBack={() => navigate('/scan')} />

      {/* Frame Status Sub-Header Bar */}
      <div className="px-4 py-3 bg-[#eef4ff] border-b border-blue-100 flex justify-between items-center text-xs shrink-0">
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">
            FRAME STATUS
          </span>
          <span className="font-extrabold text-slate-900 flex items-center gap-1.5 mt-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {productName} Captured
          </span>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">
            ASPECT RATIO
          </span>
          <span className="font-mono text-blue-600 font-extrabold text-xs mt-0.5 block">
            3:4 STANDARD
          </span>
        </div>
      </div>

      {/* Main Center Preview Container */}
      <div className="flex-1 p-5 flex items-center justify-center bg-[#f4f7fc] relative overflow-hidden">
        <div className="relative w-full max-w-[280px] aspect-[3/4] mx-auto shadow-lg bg-white rounded-2xl p-2 border border-slate-200/80">
          
          {/* Captured Image */}
          <img 
            src={previewImage} 
            alt={productName} 
            className="w-full h-full object-contain rounded-xl bg-slate-900" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80';
            }}
          />

          {/* Blue Corner Viewfinder Overlay Bracket Lines */}
          <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-blue-600 pointer-events-none"></div>
          <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-blue-600 pointer-events-none"></div>
          <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-blue-600 pointer-events-none"></div>
          <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-blue-600 pointer-events-none"></div>
          
          {/* Format Tag */}
          <div className="absolute bottom-4 right-4 bg-[#0a0f1d] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-slate-800 shadow">
            FORMAT 3:4 RATIO
          </div>

        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-white border-t border-slate-200 p-4 pb-24 space-y-3 shrink-0 shadow-sm z-20">
        <p className="text-[11px] text-slate-500 text-center font-medium">
          Verify product label declarations under Legal Metrology Rules, 2011
        </p>

        <div className="flex gap-2.5">
          {/* Retake Button */}
          <button
            onClick={() => navigate('/scan')}
            className="w-1/3 py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold border border-slate-200 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>Retake</span>
          </button>

          {/* Proceed to Compliance Verification */}
          <button
            onClick={handleContinue}
            className="flex-1 py-3.5 px-4 bg-[#1d4ed8] hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] uppercase tracking-wider"
          >
            <span>PROCEED TO VERIFICATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BottomNav />

    </div>
  );
}
