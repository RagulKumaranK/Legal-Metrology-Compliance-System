import React, { useRef } from 'react';
import { Camera, Image, X } from 'lucide-react';

export default function SelectImageModal({ isOpen, onClose, onSelectCamera, onSelectGalleryFile }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSelectGalleryFile(event.target.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-slate-100 relative animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
          <h3 className="text-base font-bold text-slate-900">Select Image</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Option 1: Take Photo */}
          <button
            onClick={() => {
              onClose();
              onSelectCamera();
            }}
            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 flex items-center gap-4 text-left transition-all active:scale-[0.98]"
          >
            <div className="p-3 bg-blue-100 text-blue-900 rounded-xl">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Take Photo</h4>
              <p className="text-xs text-slate-500">Use camera to capture</p>
            </div>
          </button>

          {/* Option 2: Choose from Gallery */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 flex items-center gap-4 text-left transition-all active:scale-[0.98]"
          >
            <div className="p-3 bg-indigo-100 text-indigo-900 rounded-xl">
              <Image className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Choose from Gallery</h4>
              <p className="text-xs text-slate-500">Select image from gallery</p>
            </div>
          </button>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>
    </div>
  );
}
