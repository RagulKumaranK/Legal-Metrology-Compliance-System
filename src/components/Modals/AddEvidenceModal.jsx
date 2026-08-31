import React, { useState } from 'react';
import { X, Camera, Upload, CheckCircle2, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export default function AddEvidenceModal({ isOpen, onClose, onAddEvidence }) {
  const [evidenceType, setEvidenceType] = useState('SIDE_PANEL');
  const [evidenceName, setEvidenceName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      if (onAddEvidence) {
        onAddEvidence({
          type: evidenceType,
          name: evidenceName || 'Supplementary Packaging Evidence',
          notes,
          timestamp: new Date().toISOString()
        });
      }
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-slate-200 relative text-slate-900 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Add Evidence Photo</h3>
              <p className="text-[11px] text-slate-500 font-medium">Attach additional visual proof</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Evidence Attached!</h4>
            <p className="text-xs text-slate-500 font-mono">Timestamped & stored in inspection vault</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Evidence Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Evidence Category
              </label>
              <select
                value={evidenceType}
                onChange={(e) => setEvidenceType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="SIDE_PANEL">Side Packaging Panel (Nutrition / Mfg)</option>
                <option value="BARCODE">EAN / Barcode Tag Scan</option>
                <option value="WEIGHT_SCALE">Verified Weighing Machine Reading</option>
                <option value="MRP_STICKER">Over-printed MRP Sticker Close-up</option>
                <option value="LAB_RECEIPT">Laboratory Verification Receipt</option>
              </select>
            </div>

            {/* Title / Reference */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Evidence Title / Reference
              </label>
              <input
                type="text"
                value={evidenceName}
                onChange={(e) => setEvidenceName(e.target.value)}
                placeholder="e.g. Side Panel MRP Stamp #2"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Simulated Capture / Upload Area */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Upload or Capture Frame
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-blue-500 transition-colors group">
                <div className="p-2.5 bg-white rounded-full border border-slate-200 group-hover:bg-blue-50 transition-colors">
                  <Upload className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Tap to upload file or capture image</p>
                  <p className="text-[10px] text-slate-400 font-mono">JPG, PNG, WEBP • Up to 15MB</p>
                </div>
              </div>
            </div>

            {/* Officer Notes */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Inspector Observation Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Notes regarding lighting, legibility, or tamper evidence..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 resize-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Attach Record</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
