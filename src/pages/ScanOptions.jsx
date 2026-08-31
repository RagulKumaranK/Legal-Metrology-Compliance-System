import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, FileUp, ShoppingCart, QrCode } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';

import heroImg from '../assets/cam.png';

export default function ScanOptions() {
  const navigate = useNavigate();
  const { setCapturedPhoto, triggerNextScanSequence } = useAuthInspection();
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageBase64 = event.target.result;
        triggerNextScanSequence(imageBase64, true);
        navigate('/scan-preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEcommerceScan = () => {
    navigate('/scan-ecommerce');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">

      <Header />

      {/* Main Scan Commodity Body */}
      <div className="flex-1 p-5 pb-24 space-y-4 overflow-y-auto">

        {/* Title & Subtitle */}
        <div className="text-center pt-2 space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Scan Commodity
          </h2>
          <p className="text-xs text-slate-600 font-medium px-4 leading-relaxed">
            Capture the package label clearly for declaration and compliance analysis.
          </p>
        </div>

        {/* Card 1: Camera Scanner Preview Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 overflow-hidden space-y-3">

          {/* Animated Futuristic AI Viewfinder Graphic Frame */}
          <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] bg-slate-950 border border-slate-800 flex items-center justify-center group shadow-2xl">
            {/* Background Graphic Image */}
            <img
              src={heroImg}
              alt="Scan Package Preview"
              className="w-full h-full object-contain p-3 opacity-90 transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = heroImg;
              }}
            />

            {/* Glowing Tech Radar Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none animate-radar-pulse"></div>

            {/* Sweeping Dual-Beam Glowing Laser Scanner Line */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38bdf8,0_0_35px_#3b82f6] animate-scan-laser z-20 pointer-events-none"></div>

            {/* Laser Trail Glow Gradient */}
            <div className="absolute left-0 right-0 h-20 bg-gradient-to-b from-cyan-500/25 via-blue-500/10 to-transparent pointer-events-none animate-scan-laser z-10" style={{ transform: 'translateY(-100%)' }}></div>

            {/* Dynamic AI OCR Bounding Boxes */}
            <div className="absolute inset-6 border border-cyan-500/30 rounded-xl pointer-events-none">

              {/* Box 1: Mandatory Declarations */}



            </div>

            {/* Futuristic Corner Targeting Reticle Brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_8px_#38bdf8] pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 shadow-[0_0_8px_#38bdf8] pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 shadow-[0_0_8px_#38bdf8] pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_8px_#38bdf8] pointer-events-none group-hover:scale-110 transition-transform"></div>

            {/* Live Camera Ready Badge */}

          </div>

          {/* SCAN USING CAMERA Action Button */}
          <button
            onClick={() => navigate('/scan-camera')}
            className="w-full py-3.5 bg-[#0a0f1d] hover:bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-[0.99]"
          >
            <Camera className="w-4 h-4 text-white" />
            <span>SCAN USING CAMERA</span>
          </button>
        </div>

        {/* Card 2: UPLOAD IMAGE Card */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center hover:border-blue-300 transition-all cursor-pointer active:scale-[0.99] flex flex-col items-center justify-center gap-2.5 group"
        >
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-100 transition-colors">
            <FileUp className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            UPLOAD IMAGE
          </span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Card 3: SCAN E-COMMERCE LISTING Card */}
        <div
          onClick={handleEcommerceScan}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center hover:border-blue-300 transition-all cursor-pointer active:scale-[0.99] flex flex-col items-center justify-center gap-2.5 group"
        >
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-100 transition-colors">
            <ShoppingCart className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            SCAN E-COMMERCE LISTING
          </span>
        </div>

      </div>

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
