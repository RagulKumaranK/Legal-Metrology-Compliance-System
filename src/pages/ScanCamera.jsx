import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, RefreshCw, Image, Camera, ShieldAlert } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import SelectImageModal from '../components/Modals/SelectImageModal';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function ScanCamera() {
  const navigate = useNavigate();
  const { setCapturedPhoto, triggerNextScanSequence } = useAuthInspection();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by this browser context.');
      }

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(e => console.warn('Video play error:', e));
      }
    } catch (err) {
      console.error('Camera Access Error:', err);
      setCameraError(err.message || 'Unable to access rear camera. Please check permissions.');
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const handleFlipCamera = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleToggleFlash = async () => {
    setIsFlashOn(!isFlashOn);
    if (stream) {
      const track = stream.getVideoTracks()[0];
      if (track && track.getCapabilities && track.getCapabilities().torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !isFlashOn }]
          });
        } catch (e) {
          console.warn('Flash torch not supported on this device track.');
        }
      }
    }
  };

  const handleCaptureFrame = () => {
    setIsCapturing(true);

    setTimeout(() => {
      triggerNextScanSequence();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      navigate('/scan-preview');
    }, 300);
  };

  const handleGallerySelected = (imageBase64) => {
    triggerNextScanSequence(imageBase64, true);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    navigate('/scan-preview');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050811] text-white relative overflow-hidden font-sans antialiased animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 bg-[#080d1a]/90 border-b border-slate-800/80 flex justify-between items-center">
        {/* Flash Toggle Button */}
        <button 
          onClick={handleToggleFlash}
          className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
            isFlashOn 
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' 
              : 'bg-[#111827] text-slate-200 border-slate-700/80 hover:bg-slate-800'
          }`}
          aria-label="Toggle Flashlight"
        >
          <Zap className="w-5 h-5 fill-current" />
        </button>

        {/* Center Status Badge */}
        <div className="px-3.5 py-1.5 rounded-full bg-[#1d4ed8] text-white text-[10px] font-mono font-bold tracking-widest flex items-center gap-2 border border-blue-400/30 shadow-md">
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></span>
          <span>SCANNING COMMODITY LABEL</span>
        </div>

        {/* Switch Camera Button */}
        <button 
          onClick={handleFlipCamera}
          className="w-11 h-11 rounded-xl bg-[#111827] border border-slate-700/80 text-slate-200 flex items-center justify-center hover:bg-slate-800 transition-all"
          aria-label="Switch Camera"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Camera Viewport Canvas */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
        
        {cameraError ? (
          <div className="p-6 text-center max-w-xs bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-20 space-y-3">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Camera Permissions Required</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Please grant camera access in browser settings to scan commodity labels directly.
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={startCamera}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md"
              >
                Request Access
              </button>
              <button
                onClick={() => setShowSelectModal(true)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs"
              >
                Upload Photo from Gallery
              </button>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
        )}

        {/* Alignment Guidance Banner */}
        <div className="absolute top-20 left-0 right-0 z-20 text-center pointer-events-none px-4">
          <div className="inline-block px-4 py-1.5 rounded-md bg-[#080d1a]/90 text-slate-100 text-[11px] font-mono font-bold border border-slate-700/80 tracking-wider shadow-lg">
            ALIGN PRODUCT DECLARATION PANEL INSIDE FRAME
          </div>
        </div>

        {/* Viewfinder Reticles Box */}
        <div className="relative z-10 w-[280px] aspect-[3/4] pointer-events-none flex flex-col justify-between p-2">
          
          {/* Top Corners */}
          <div className="flex justify-between">
            <div className="w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
          </div>

          {/* Center Target Pointer Reticle */}
          <div className="flex flex-col items-center justify-center relative my-auto">
            <div className="w-9 h-9 rounded-full border border-cyan-400/80 flex items-center justify-center bg-cyan-400/5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            </div>
            {/* Horizontal Guide Line */}
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-6"></div>
          </div>

          {/* Bottom Corners */}
          <div className="flex justify-between">
            <div className="w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>
          </div>

        </div>

      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Bottom Shutter Action Bar */}
      <div className="bg-[#080d1a] border-t border-slate-800/80 p-5 flex items-center justify-around z-30 pb-24">
        {/* Gallery Upload */}
        <button
          onClick={() => setShowSelectModal(true)}
          className="w-13 h-13 rounded-2xl bg-[#111827] text-slate-200 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center shadow-md transition-all active:scale-95"
          aria-label="Gallery Upload"
        >
          <Image className="w-6 h-6 text-slate-200" />
        </button>

        {/* Shutter Camera Button */}
        <button
          onClick={handleCaptureFrame}
          disabled={isCapturing}
          className="w-20 h-20 rounded-full bg-blue-600 p-1 shadow-2xl active:scale-95 transition-all flex items-center justify-center border-4 border-blue-500/80"
          aria-label="Capture Photograph"
        >
          <div className="w-full h-full rounded-full border-2 border-[#080d1a] bg-white hover:bg-slate-100 flex items-center justify-center">
            {isCapturing && <div className="w-8 h-8 rounded-full bg-blue-600 animate-ping"></div>}
          </div>
        </button>

        {/* Sample Camera Capture */}
        <button
          onClick={() => {
            triggerNextScanSequence();
            navigate('/scan-preview');
          }}
          className="w-13 h-13 rounded-2xl bg-[#111827] text-slate-200 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center shadow-md transition-all active:scale-95"
          aria-label="Sample Commodity"
        >
          <Camera className="w-6 h-6 text-slate-200" />
        </button>
      </div>

      <SelectImageModal
        isOpen={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSelectCamera={startCamera}
        onSelectGalleryFile={handleGallerySelected}
      />

      <BottomNav />

    </div>
  );
}
