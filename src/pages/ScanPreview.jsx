import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function ScanPreview() {
  const navigate = useNavigate();
  const { capturedImage, generateScanAnalysis } = useAuthInspection();

  const previewImage = capturedImage || 'https://images.unsplash.com/photo-1626197031507-c170a045c697?auto=format&fit=crop&w=800&q=80';

  const handleContinue = () => {
    // Generate compliance analysis result and navigate to Scan Result
    generateScanAnalysis("Tata Salt Iodised 1kg", previewImage);
    navigate('/scan-result');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900 text-white animate-in fade-in duration-300">
      
      {/* Top Bar Header */}
      <Header 
        title="Image Preview" 
        showBack={true} 
        onBack={() => navigate('/scan')} 
      />

      {/* Image Preview Container */}
      <div className="flex-1 p-4 flex items-center justify-center bg-slate-950 overflow-hidden relative">
        <img 
          src={previewImage} 
          alt="Captured Commodity" 
          className="max-h-[68vh] w-auto object-contain rounded-2xl shadow-2xl border border-slate-800" 
        />
      </div>

      {/* Bottom Actions Bar */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 flex gap-3 z-30">
        
        {/* Retake Button */}
        <button
          onClick={() => navigate('/scan')}
          className="flex-1 py-3 px-4 bg-white text-slate-900 border border-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake</span>
        </button>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="flex-1 py-3 px-4 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
}
