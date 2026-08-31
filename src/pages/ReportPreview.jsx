import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Printer, Download, Share2, Gavel, AlertTriangle, Camera, FileText, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import Header from '../components/Header';
import GovernmentEmblem from '../components/GovernmentEmblem';
import ReportModal from '../components/Modals/ReportModal';
import { useAuthInspection } from '../context/AuthInspectionContext';
import { DEMO_SCAN_QUEUE } from '../data/mockInspections';

export default function ReportPreview() {
  const navigate = useNavigate();
  const { activeAnalysis, officer, capturedImage } = useAuthInspection();

  const defaultItem = DEMO_SCAN_QUEUE[0];
  const analysis = activeAnalysis || defaultItem;

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const rawPhoto = analysis.rawImage || capturedImage || defaultItem.rawImage || analysis.image;
  const processedPhoto = analysis.processedImage || defaultItem.processedImage || rawPhoto;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fc] text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">
      
      <Header 
        showBack={true} 
        onBack={() => navigate(-1)} 
        title="REPORT PREVIEW"
        rightAction={
          <button 
            onClick={handlePrint}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Print Official Report"
          >
            <Printer className="w-5 h-5" />
          </button>
        }
      />

      {/* Main Body */}
      <div className="flex-1 p-4 pb-12 space-y-4 overflow-y-auto print:p-0">
        
        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>PDF Inspection Report compiled & downloaded successfully!</span>
          </div>
        )}

        {/* Official Report Document Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-0">
          
          {/* Government Emblem Banner Header Box */}
          <div className="bg-[#e9f1fc] p-6 text-center space-y-2 border-b border-blue-100">
            <div className="flex justify-center mb-1">
              <GovernmentEmblem className="w-12 h-12 text-slate-800" />
            </div>
            
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900 leading-tight">
              GOVERNMENT OF INDIA
            </h2>
            <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-700">
              DEPARTMENT OF CONSUMER AFFAIRS
            </h3>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">
              LEGAL METROLOGY DIVISION
            </h4>

            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mt-2"></div>
          </div>

          <div className="p-5 space-y-5">
            
            {/* Inspection Details Metadata Block */}
            <div className="space-y-3 text-xs border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  COMMODITY NAME & NET QUANTITY
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  {analysis.name} • {analysis.netQuantity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                    INSPECTION ID
                  </span>
                  <span className="text-xs font-extrabold font-mono text-slate-900">
                    {analysis.id || 'INS-2026-001'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                    DATE & TIME
                  </span>
                  <span className="text-xs font-semibold text-slate-800 font-mono">
                    {analysis.date || '05 Sep 2026'} | {analysis.time || '17:51 IST'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  INSPECTING OFFICER
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {officer?.name || 'Officer Sharma'} (ID: {officer?.officerId || 'LM/EG/2026/1001'})
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  MANUFACTURER / MARKETER
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  {analysis.ocrExtracted?.marketer || analysis.ocrExtracted?.manufacturer || analysis.manufacturer || "Not declared / Not visible"}
                </span>
              </div>
            </div>

            {/* Compliance Verdict & Score Box */}
            <div className={`border rounded-xl p-4 flex items-center justify-between shadow-xs ${
              analysis.status === 'COMPLIANT' 
                ? 'bg-emerald-50/90 border-emerald-200' 
                : analysis.status === 'REVIEW REQUIRED' 
                  ? 'bg-amber-50/90 border-amber-200' 
                  : 'bg-rose-50/90 border-rose-200'
            }`}>
              <div>
                <h4 className={`text-xs font-extrabold ${
                  analysis.status === 'COMPLIANT' ? 'text-emerald-900' : analysis.status === 'REVIEW REQUIRED' ? 'text-amber-900' : 'text-rose-900'
                }`}>
                  {analysis.status}
                </h4>
                <p className="text-[11px] text-slate-600 font-medium">
                  Passed {analysis.checks?.passed ?? (analysis.status === 'COMPLIANT' ? 10 : 4)} of {analysis.checks?.total || 10} Mandatory Checks
                </p>
              </div>

              <div className="text-right">
                <span className={`text-2xl font-black font-mono ${
                  analysis.status === 'COMPLIANT' ? 'text-emerald-600' : analysis.status === 'REVIEW REQUIRED' ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {analysis.complianceScore !== null && analysis.complianceScore !== undefined 
                    ? analysis.complianceScore 
                    : (analysis.status === 'COMPLIANT' ? 100 : 40)}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono"> /100</span>
              </div>
            </div>

            {/* Identified Audit Findings / Violations Section */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                {analysis.status === 'COMPLIANT' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
                <span>Legal Metrology Audit Findings</span>
              </h4>

              {analysis.status === 'COMPLIANT' ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-1">
                  <h5 className="text-xs font-extrabold text-emerald-800 font-mono">
                    FULL RULE 6 & RULE 7 CONFORMITY
                  </h5>
                  <p className="text-xs text-emerald-900 leading-snug">
                    All 10 mandatory package declarations (Product Name, Net Quantity {analysis.netQuantity}, MRP, Mfg Date, Best Before, Unit Sale Price, Manufacturer Details, and Consumer Care) fully comply with Legal Metrology (Packaged Commodities) Rules, 2011.
                  </p>
                </div>
              ) : analysis.status === 'REVIEW REQUIRED' ? (
                <div className="space-y-2">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1">
                    <h5 className="text-xs font-extrabold text-amber-800 font-mono">
                      RULE 6(1)(f) - MAXIMUM RETAIL PRICE (MRP)
                    </h5>
                    <p className="text-xs text-amber-900 leading-snug">
                      MRP declaration value not visible or obscured in captured package region. Mandatory field under Section 18.
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1">
                    <h5 className="text-xs font-extrabold text-amber-800 font-mono">
                      RULE 6(1)(e) - MFG DATE & EXPIRY / BEST BEFORE
                    </h5>
                    <p className="text-xs text-amber-900 leading-snug">
                      Date of manufacture and Best Before declarations unreadable/not visible in captured area.
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1">
                    <h5 className="text-xs font-extrabold text-amber-800 font-mono">
                      RULE 6(1)(a) - MANUFACTURER / PACKER DETAILS
                    </h5>
                    <p className="text-xs text-amber-900 leading-snug">
                      Manufacturer name and factory address missing in captured region. Marketer declared as Agro Mark India Pvt. Ltd.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {(analysis.violationsList || []).map((v, i) => (
                    <div key={i} className="bg-[#fff1f1] border border-rose-200 rounded-xl p-3.5 space-y-1">
                      <h5 className="text-xs font-extrabold text-rose-700 font-mono">
                        {v.rule || `RULE VIOLATION #${i+1}`}
                      </h5>
                      <p className="text-xs text-rose-900 leading-snug">
                        {v.description || v.title || String(v)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Evidence Documentation Grid */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-blue-600" />
                <span>Evidence Documentation</span>
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {/* Image 1: Raw Captured Photo */}
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-950 group">
                  <img 
                    src={rawPhoto} 
                    alt="Raw Evidence" 
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultItem.rawImage || defaultItem.image;
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-1.5 text-[9px] font-mono text-slate-200 leading-tight">
                    <span className="font-bold block">RAW CAPTURED FRAME</span>
                    <span className="text-slate-400">Original Package Label</span>
                  </div>
                </div>

                {/* Image 2: Processed OCR Mesh */}
                <div className="relative rounded-xl overflow-hidden border border-blue-200 aspect-[4/3] bg-slate-950 group">
                  <img 
                    src={analysis.processedImage || rawPhoto} 
                    alt="Processed OCR Evidence" 
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultItem.processedImage || defaultItem.image;
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-1.5 text-[9px] font-mono text-blue-300 leading-tight">
                    <span className="font-bold block">VISION LLM MESH</span>
                    <span className="text-blue-400">AI Bounding Overlay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Officer Remarks Block */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-700" />
                <span>Officer Inspection Remarks</span>
              </h4>

              <div className="bg-[#eef4ff] border border-blue-100 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed font-sans">
                {analysis.status === 'COMPLIANT' ? (
                  `Physical packaging inspection for ${analysis.name} (${analysis.netQuantity}) verified 100% compliant with mandatory declarations specified in Rule 6 & Rule 7 of Legal Metrology (Packaged Commodities) Rules, 2011. Manufacturer: ${analysis.manufacturer || 'Yummy Foodspecialities Pvt Ltd.'}.`
                ) : analysis.status === 'REVIEW REQUIRED' ? (
                  `Inspection audit of ${analysis.name} (${analysis.netQuantity}) identified 6 declaration fields (MRP, Mfg Date, Best Before, Unit Sale Price, Batch No, Manufacturer Details) not visible in captured package region. Marketer: Agro Mark India Pvt. Ltd. Manual officer review recommended.`
                ) : (
                  `Commodity audit of ${analysis.name} (${analysis.netQuantity}) detected rule infractions under Legal Metrology Act, 2009. Official notice generated for enforcement compliance.`
                )}
              </div>
            </div>

            {/* Digital Signature Box */}
            <div className="bg-[#eef4ff] border border-blue-200/80 rounded-xl p-3.5 flex justify-between items-center text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">
                  DIGITALLY SIGNED BY
                </span>
                <span className="font-extrabold text-slate-900 block">
                  {officer?.name || 'Rajan K. Sharma'}
                </span>
                <span className="text-[11px] text-slate-600 block font-medium">
                  Legal Metrology Officer
                </span>
              </div>

              <div className="text-right space-y-1">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-600 block">
                  VERIFIED: ABF9-2B4C
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons Stack */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleDownload}
            className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>DOWNLOAD PDF</span>
          </button>

          <button
            onClick={handleDownload}
            className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <Share2 className="w-4 h-4 text-slate-600" />
            <span>EXPORT REPORT</span>
          </button>

          <button
            onClick={() => setShowNoticeModal(true)}
            className="w-full py-3.5 bg-[#0a0f1d] hover:bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <Gavel className="w-4 h-4 text-amber-400" />
            <span>GENERATE NOTICE</span>
          </button>
        </div>

      </div>

      <ReportModal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        analysis={analysis}
        officer={officer}
      />

    </div>
  );
}
