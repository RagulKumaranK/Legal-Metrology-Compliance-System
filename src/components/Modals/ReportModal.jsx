import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, ShieldAlert, Printer, X } from 'lucide-react';
import GovernmentEmblem from '../GovernmentEmblem';
import confetti from 'canvas-confetti';

export default function ReportModal({ isOpen, onClose, analysis, officer }) {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !analysis) return null;

  const triggerDownload = () => {
    setDownloading(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => {
      setDownloading(false);
      alert(`Report ${analysis.id}_Compliance_Notice.pdf generated and saved.`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-slate-100 relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-900" />
            <h3 className="text-sm font-bold text-slate-900">Official Inspection Report</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Report Document Body */}
        <div className="flex-1 overflow-y-auto pr-1 text-left space-y-4 font-sans border border-slate-200 rounded-xl p-4 bg-slate-50/50">
          
          {/* Header Branding */}
          <div className="text-center border-b border-slate-200 pb-3">
            <GovernmentEmblem size={36} className="mx-auto mb-1" />
            <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Government of India</h4>
            <p className="text-[10px] text-slate-600 font-medium">Department of Consumer Affairs</p>
            <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mt-0.5">Legal Metrology Compliance Enforcement</p>
          </div>

          {/* Reference Meta */}
          <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">Notice Ref:</span> <span className="font-mono font-bold text-slate-800">{analysis.id}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Inspection Date:</span> <span className="font-semibold text-slate-800">{analysis.date} • {analysis.time}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Inspecting Officer:</span> <span className="font-semibold text-slate-800">{officer?.name || "Officer Sharma"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Officer ID:</span> <span className="font-mono text-slate-800">{officer?.officerId || "LM/EG/2026/1001"}</span></div>
          </div>

          {/* Commodity Details */}
          <div>
            <h5 className="text-[11px] font-bold uppercase text-slate-700 tracking-wider mb-1">Commodity Audited</h5>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-900">{analysis.name}</p>
              <p className="text-[11px] text-slate-600">Category: {analysis.category || "Packaged Commodity"}</p>
              <p className="text-[11px] text-slate-600">Net Quantity: {analysis.netQuantity}</p>
              <p className="text-[11px] text-slate-600">Manufacturer/Packer: {analysis.manufacturer}</p>
            </div>
          </div>

          {/* Compliance Status Verdict */}
          <div>
            <h5 className="text-[11px] font-bold uppercase text-slate-700 tracking-wider mb-1">Enforcement Finding</h5>
            <div className={`p-3 rounded-lg border flex items-center justify-between ${
              analysis.status === 'COMPLIANT' 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="flex items-center gap-2">
                {analysis.status === 'COMPLIANT' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <ShieldAlert className="w-5 h-5 text-rose-600" />}
                <div>
                  <span className="text-xs font-black tracking-wider uppercase block">{analysis.status}</span>
                  <span className="text-[10px]">Legal Metrology Rules, 2011</span>
                </div>
              </div>
              <span className="text-base font-black font-mono">{analysis.complianceScore}%</span>
            </div>
          </div>

          {/* Infractions Summary */}
          {analysis.violationsList?.length > 0 && (
            <div>
              <h5 className="text-[11px] font-bold uppercase text-slate-700 tracking-wider mb-1">Noticed Infractions</h5>
              <div className="space-y-1.5">
                {analysis.violationsList.map((v, idx) => (
                  <div key={idx} className="p-2 bg-white rounded border border-rose-200 text-[11px]">
                    <span className="font-bold text-rose-800">{v.title}:</span> <span className="text-slate-700">{v.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal Notice Footer Statement */}
          <div className="border-t border-slate-200 pt-2 text-[10px] text-slate-500 text-center font-mono">
            Generated via Legal Metrology Compliance Enforcement Portal • Secure Gov Verification
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-slate-100 shrink-0">
          <button
            onClick={triggerDownload}
            disabled={downloading}
            className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? "Exporting..." : "Download PDF Report"}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs flex items-center justify-center gap-1 font-semibold"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
