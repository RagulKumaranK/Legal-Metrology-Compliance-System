import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, FileText, Maximize2, AlertOctagon, Terminal, User
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';
import { DEMO_SCAN_QUEUE } from '../data/mockInspections';

export default function InspectionDetail() {
  const navigate = useNavigate();
  const { activeAnalysis, officer, capturedImage } = useAuthInspection();

  const defaultItem = DEMO_SCAN_QUEUE[0];
  const analysis = activeAnalysis || defaultItem;

  const rawPhoto = analysis.rawImage || capturedImage || defaultItem.rawImage || analysis.image;
  const processedPhoto = analysis.processedImage || defaultItem.processedImage || rawPhoto;

  const isCompliant = analysis.status === 'COMPLIANT';

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">
      
      <Header showBack={true} onBack={() => navigate(-1)} />

      {/* Main Body */}
      <div className="flex-1 p-4 pb-24 space-y-4 overflow-y-auto">
        
        {/* Title Header */}
        <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider block">
              INSPECTION DETAIL
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">
              {analysis.id || 'INS-2026-00098'}
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Logged on Oct 24, 2026, 14:32
            </p>
          </div>

          <span className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 border ${
            isCompliant 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
              : 'bg-rose-50 text-rose-800 border-rose-300'
          }`}>
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>{isCompliant ? 'Compliant' : 'Non-Compliant'}</span>
          </span>
        </div>

        {/* Action Toolbar */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/evidence-review')}
            className="py-2.5 px-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-bold rounded text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
          >
            <Eye className="w-4 h-4 text-slate-700" />
            <span>VIEW EVIDENCE</span>
          </button>

          <button
            onClick={() => navigate('/report-preview')}
            className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>GENERATE REPORT</span>
          </button>
        </div>

        {/* Product Metadata Panel */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-slate-900">
          <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Product Metadata
            </span>
          </div>

          <div className="p-4 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Brand Name</span>
                <span className="text-xs font-bold text-slate-900">{analysis.name || 'Acme Essentials'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Product Category</span>
                <span className="text-xs font-bold text-slate-800">{analysis.category || 'Packaged Foods'}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Batch No.</span>
                <span className="text-xs font-bold font-mono text-slate-900">BN-883492</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">MFG Date</span>
                <span className="text-xs font-bold font-mono text-slate-900">2026-09-15</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Declared Net Wt.</span>
                <span className="text-xs font-bold text-slate-900 font-mono">500g</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
              <span className="text-[11px] text-slate-500 font-mono">Inspecting Officer:</span>
              <span className="font-bold text-slate-900 font-mono">Insp. J. Doe (LM-4492)</span>
            </div>
          </div>
        </div>

        {/* Compliance Score Panel */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Compliance Score
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-[200px] leading-snug">
              Critical violations found in declarations. Action required.
            </p>
          </div>

          <div className="w-14 h-14 rounded border-2 border-rose-600 bg-rose-50 flex items-center justify-center text-center">
            <span className="text-2xl font-black text-rose-600 font-mono">42</span>
          </div>
        </div>

        {/* Primary Evidence Preview */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 flex justify-between items-center border-b border-slate-200">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Primary Evidence
            </span>
            <button 
              onClick={() => navigate('/evidence-review')}
              className="text-slate-600 hover:text-slate-900"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-slate-950">
            <div className="relative rounded overflow-hidden aspect-[4/3] bg-slate-900 flex items-center justify-center">
              <img 
                src={processedPhoto} 
                alt="Primary Evidence"
                className="w-full h-full object-contain" 
              />
              
              <div className="absolute bottom-6 left-12 right-12 h-6 border border-rose-500 bg-rose-500/20 rounded flex items-center justify-center">
                <span className="bg-rose-600 text-white text-[9px] font-bold px-1 font-mono">MRP: MISSING</span>
              </div>

              <div className="absolute bottom-2 right-2 bg-slate-900/90 text-slate-300 text-[9px] px-2 py-0.5 rounded font-mono border border-slate-800">
                IMG_8849.JPG
              </div>
            </div>
          </div>
        </div>

        {/* Rule Validation Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Rule Validation Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase text-slate-500">
                  <th className="py-2.5 px-3">Declaration</th>
                  <th className="py-2.5 px-2">Extracted Value</th>
                  <th className="py-2.5 px-2">Rule Reference</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900">MRP (Max Retail Price)</td>
                  <td className="py-2.5 px-2 font-bold text-rose-600">Missing / Illegible</td>
                  <td className="py-2.5 px-2 font-mono text-[11px] text-slate-600">PCR 2011, Rule 6(1)(e)</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold text-[10px] rounded border border-rose-200 inline-block">
                      Fail
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900">Net Weight</td>
                  <td className="py-2.5 px-2 font-bold text-slate-800">500g</td>
                  <td className="py-2.5 px-2 font-mono text-[11px] text-slate-600">PCR 2011, Rule 6(1)(c)</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded border border-emerald-200 inline-block">
                      Pass
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900">Manufacturer Address</td>
                  <td className="py-2.5 px-2 font-bold text-rose-600">Partial (No Pin Code)</td>
                  <td className="py-2.5 px-2 font-mono text-[11px] text-slate-600">PCR 2011, Rule 6(1)(a)</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold text-[10px] rounded border border-rose-200 inline-block">
                      Fail
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* System Audit Log */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-3.5 text-slate-200 font-mono text-xs space-y-2">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-800 text-slate-300">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold uppercase tracking-wider text-[11px]">System Audit Log</h4>
          </div>

          <div className="space-y-1 text-[11px] pt-1">
            <p className="text-slate-400">
              <span className="text-slate-500">14:32:01</span> <span className="text-cyan-400 font-bold">INFO</span> Image uploaded by ID:LM-4492 (img_hash: a8f9...2b1)
            </p>
            <p className="text-slate-400">
              <span className="text-slate-500">14:32:05</span> <span className="text-cyan-400 font-bold">INFO</span> OCR processing initiated (engine: tesseract_v5_pro)
            </p>
            <p className="text-amber-300">
              <span className="text-slate-500">14:32:12</span> <span className="text-amber-400 font-bold">WARN</span> Confidence score low (0.42) for region [x:120, y:450, w:80, h:20] - expected MRP
            </p>
            <p className="text-slate-400">
              <span className="text-slate-500">14:32:15</span> <span className="text-cyan-400 font-bold">INFO</span> Rule engine evaluated against PCR 2011 template.
            </p>
          </div>
        </div>

      </div>

      <BottomNav />

    </div>
  );
}
