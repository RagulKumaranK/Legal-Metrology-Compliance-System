import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flashlight, RefreshCw, Image, Camera, AlertCircle, ShieldAlert, Upload } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import SelectImageModal from '../components/Modals/SelectImageModal';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function ScanCamera() {
  const navigate = useNavigate();
  const { setCapturedPhoto } = useAuthInspection();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const nativeFileInputRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Initialize browser camera stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is restricted in this app view.');
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
      console.warn('Camera Access Warning:', err);
      setCameraError(err.message || 'Unable to access rear camera. Please grant camera permission or use system photo capture.');
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
          console.warn('Torch not supported on this track.');
        }
      }
    }
  };

  const handleCaptureFrame = () => {
    setIsCapturing(true);

    setTimeout(() => {
      try {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          const video = videoRef.current;
          const canvas = canvasRef.current || document.createElement('canvas');
          canvas.width = video.videoWidth || 1280;
          canvas.height = video.videoHeight || 720;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          setCapturedPhoto(dataUrl);

          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }

          navigate('/scan-preview');
        } else {
          // If video element is not ready, trigger native camera file input fallback
          if (nativeFileInputRef.current) {
            nativeFileInputRef.current.click();
          } else {
            setCapturedPhoto('https://images.unsplash.com/photo-1626197031507-c170a045c697?auto=format&fit=crop&w=800&q=80');
            navigate('/scan-preview');
          }
        }
      } catch (err) {
        console.error('Frame capture error:', err);
        nativeFileInputRef.current?.click();
      }
    }, 300);
  };

  const handleNativeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedPhoto(event.target.result);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        navigate('/scan-preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGallerySelected = (imageBase64) => {
    setCapturedPhoto(imageBase64);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    navigate('/scan-preview');
  };

  return (
    <div className="flex-1 flex flex-col bg-black text-white relative overflow-hidden animate-in fade-in duration-300">
      
      {/* Top Camera Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex justify-between items-center">
        {/* Flash Toggle */}
        <button 
          onClick={handleToggleFlash}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
            isFlashOn ? 'bg-amber-400 text-black border-amber-300' : 'bg-black/40 text-white border-white/20 hover:bg-black/60'
          }`}
          aria-label="Toggle Flash"
        >
          <Flashlight className="w-5 h-5" />
        </button>

        {/* Top Status Pill */}
        <div className="px-3.5 py-1 rounded-full bg-blue-900/80 backdrop-blur-md border border-blue-400/50 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>SCANNING PRODUCT</span>
        </div>

        {/* Flip Camera */}
        <button 
          onClick={handleFlipCamera}
          className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all"
          aria-label="Switch Camera"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Camera Stream Viewport */}
      <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden">
        
        {cameraError ? (
          /* Graceful Permission / Standalone Error Screen */
          <div className="p-6 text-center max-w-xs bg-slate-900/90 border border-slate-800 rounded-3xl backdrop-blur-lg shadow-2xl z-20">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">Camera Permission Required</h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              If live camera streaming is blocked by your browser app, tap below to take a photo using your device camera.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => nativeFileInputRef.current?.click()}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Camera className="w-4 h-4" />
                <span>Take Photo with Camera</span>
              </button>
              <button
                onClick={startCamera}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs"
              >
                Retry Live Stream
              </button>
            </div>
          </div>
        ) : (
          /* Live Video Element */
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Camera Frame Overlay Bracket UI */}
        <div className="relative z-10 w-72 h-96 pointer-events-none flex flex-col justify-between p-2">
          
          {/* Top Corners */}
          <div className="flex justify-between">
            <div className="w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl shadow-sm"></div>
            <div className="w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl shadow-sm"></div>
          </div>

          {/* Central Target Crosshair & Laser */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 border border-white/60 rounded-full flex items-center justify-center relative">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute w-full h-[1px] bg-white/40"></div>
              <div className="absolute h-full w-[1px] bg-white/40"></div>
            </div>
            
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent my-6 shadow-[0_0_12px_#3b82f6] animate-pulse"></div>
          </div>

          {/* Bottom Corners */}
          <div className="flex justify-between">
            <div className="w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl shadow-sm"></div>
            <div className="w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl shadow-sm"></div>
          </div>
        </div>

        {/* Instruction Banner */}
        <div className="absolute top-20 left-0 right-0 z-20 text-center pointer-events-none">
          <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-md border border-white/10">
            Align the product label inside the frame
          </span>
        </div>

      </div>

      {/* Hidden Canvas for Frame Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden Native File Input for App Fallback */}
      <input 
        type="file" 
        ref={nativeFileInputRef}
        onChange={handleNativeFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Bottom Controls Bar */}
      <div className="bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 flex items-center justify-around z-30">
        
        {/* Gallery / Pick Image button */}
        <button
          onClick={() => setShowSelectModal(true)}
          className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
          aria-label="Gallery Upload"
        >
          <Image className="w-6 h-6" />
        </button>

        {/* Large White Circular Capture Button */}
        <button
          onClick={handleCaptureFrame}
          disabled={isCapturing}
          className="w-18 h-18 rounded-full bg-white p-1.5 shadow-2xl active:scale-95 transition-all flex items-center justify-center border-4 border-slate-300"
          aria-label="Capture Photograph"
        >
          <div className="w-full h-full rounded-full border-2 border-slate-900 bg-white hover:bg-slate-100 flex items-center justify-center">
            {isCapturing && <div className="w-6 h-6 rounded-full bg-blue-900 animate-ping"></div>}
          </div>
        </button>

        {/* Direct Device Native Camera Capture Launcher */}
        <button
          onClick={() => nativeFileInputRef.current?.click()}
          className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
          aria-label="Launch Device Camera"
        >
          <Camera className="w-6 h-6" />
        </button>

      </div>

      {/* Select Image Modal */}
      <SelectImageModal
        isOpen={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSelectCamera={startCamera}
        onSelectGalleryFile={handleGallerySelected}
      />

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
