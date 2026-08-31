import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, FileText, Eye, CheckCircle2, ChevronRight, Clock, Zap, Layers, Type, Check, X, Camera, Sliders, ClipboardList, CheckCheck, ChevronDown, ChevronUp, AlertTriangle, Landmark } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import EvidenceModal from '../components/Modals/EvidenceModal';
import ReportModal from '../components/Modals/ReportModal';
import { useAuthInspection } from '../context/AuthInspectionContext';
import { DEMO_SCAN_QUEUE } from '../data/mockInspections';

export default function ScanResult() {
  const navigate = useNavigate();
  const { activeAnalysis, officer, capturedImage } = useAuthInspection();

  const defaultItem = DEMO_SCAN_QUEUE[0];
  const analysis = activeAnalysis || defaultItem;

  const isNewScan = activeAnalysis?.isNewScan === true;

  // Processing Countdown State (15s - 30s) - ONLY for new scans
  const [analyzing, setAnalyzing] = useState(isNewScan);
  const [totalSeconds, setTotalSeconds] = useState(20);
  const [remainingSeconds, setRemainingSeconds] = useState(isNewScan ? 20 : 0);
  const [showAllDeclarations, setShowAllDeclarations] = useState(false);

  const [showEvidence, setShowEvidence] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const rawPhoto = analysis.rawImage || capturedImage || defaultItem.rawImage || analysis.image;
  const processedPhoto = analysis.processedImage || defaultItem.processedImage || rawPhoto;

  const declarationsList = analysis.fontSizeAnalysis ? analysis.fontSizeAnalysis.map(item => ({
    title: item.field,
    value: item.value,
    rule: item.rule,
    height: item.measuredSize && item.measuredSize !== "Not measurable" && item.measuredSize !== "Not reliably measurable"
      ? `H: ${item.measuredSize}`
      : (item.measuredSize === "Not measurable" || item.measuredSize === "Not reliably measurable" ? item.measuredSize : null),
    status: item.status === "PASS" ? "Valid" : (item.status === "REVIEW" ? "Review Required" : "Violation"),
    statusType: item.status
  })) : [
    {
      title: "Net Quantity",
      value: analysis.ocrExtracted?.netQty || analysis.netQuantity || "45 g",
      rule: "Rule 6",
      height: "H: 3.2mm (Req: 3.0mm)",
      status: "Valid",
      statusType: "PASS"
    },
    {
      title: "Maximum Retail Price (MRP)",
      value: analysis.ocrExtracted?.mrpText || analysis.mrp || "Rs. 20.00 (Incl. of all taxes)",
      rule: "Rule 6(1)(e)",
      status: "Valid",
      statusType: "PASS"
    },
    {
      title: "Date of Manufacture",
      value: analysis.ocrExtracted?.mfgDate || analysis.date || "01/09/2026",
      rule: "Rule 6(1)(d)",
      status: "Valid",
      statusType: "PASS"
    },
    {
      title: "Manufacturer Details",
      value: analysis.ocrExtracted?.manufacturer || analysis.manufacturer || "Sweet Co. Ltd, 123 Baker St, Cityville",
      rule: "Rule 6(1)(a)",
      status: "Valid",
      statusType: "PASS"
    },
    {
      title: "Unit Sale Price",
      value: analysis.ocrExtracted?.unitSalePrice || "Rs. 0.44 / g",
      rule: "Rule 6(1)(n)",
      status: "Valid",
      statusType: "PASS"
    },
    {
      title: "Country of Origin",
      value: analysis.ocrExtracted?.countryOfOrigin || "India",
      rule: "Rule 6(1)(m)",
      status: "Valid",
      statusType: "PASS"
    },
    {
      title: "Consumer Care Details",
      value: analysis.ocrExtracted?.customerCare || "care@sweetco.com • 1800-111-222",
      rule: "Rule 6(2)",
      status: "Valid",
      statusType: "PASS"
    }
  ];

  useEffect(() => {
    // If opening an already scanned product, skip the 15-30s timer!
    if (!activeAnalysis?.isNewScan) {
      setAnalyzing(false);
      setRemainingSeconds(0);
      return;
    }

    const chosenDuration = Math.floor(Math.random() * 16) + 15; // 15 to 30
    setTotalSeconds(chosenDuration);
    setRemainingSeconds(chosenDuration);
    setAnalyzing(true);

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAnalyzing(false);
          if (activeAnalysis) {
            activeAnalysis.isNewScan = false;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeAnalysis]);

  const handleSkipWait = () => {
    setRemainingSeconds(0);
    setAnalyzing(false);
    if (activeAnalysis) {
      activeAnalysis.isNewScan = false;
    }
  };

  const progressPct = Math.min(100, Math.round(((totalSeconds - remainingSeconds) / totalSeconds) * 100));
  const isCompliant = analysis.status === 'COMPLIANT';
  const isReviewRequired = analysis.status === 'REVIEW REQUIRED';
  const passedCount = analysis.checks?.passed ?? (isCompliant ? 10 : 4);

  const visibleDeclarations = showAllDeclarations ? declarationsList : declarationsList.slice(0, 4);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">

      <Header showBack={true} onBack={() => navigate(-1)} />

      <div className="flex-1 p-5 pb-24 space-y-4 overflow-y-auto">

        {analyzing ? (
          /* Target Inspection Audit Processing UI Screen */
          <div className="space-y-4">

            {/* Header Title & Badge */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Inspection<br />Audit
                </h2>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  Session ID: #LMS-2026-{analysis.id || "8942-A"}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>LIVE AUDIT IN PROGRESS</span>
              </div>
            </div>

            {/* Live Feed Dual Image Card Box (Bigger Full-Width Display) */}
            <div className="bg-white rounded-2xl border border-blue-200/80 shadow-sm overflow-hidden p-4 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900 pb-2 border-b border-blue-100">
                <span className="text-sm font-extrabold flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-600" /> Live Inspection Image Feeds
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  DUAL FEED ACTIVE
                </span>
              </div>

              <div className="space-y-4">
                {/* 1. Raw Image (Bigger) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span>1. Raw Captured Image</span>
                    <span className="text-[10px] font-mono text-slate-400">RAW FRAME</span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] bg-slate-950 border border-slate-300 shadow-md">
                    <img
                      src={rawPhoto}
                      alt="Raw Captured Frame"
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultItem.rawImage || defaultItem.image;
                      }}
                    />
                    <span className="absolute top-2.5 left-2.5 bg-slate-950/90 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-slate-700 shadow">
                      RAW IMAGE
                    </span>
                  </div>
                </div>

                {/* 2. Processed Image (Bigger) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-blue-700">
                    <span>2. Processed Vision LLM Mesh</span>
                    <span className="text-[10px] font-mono text-blue-600">VISION LLM</span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] bg-slate-950 border-2 border-blue-500 shadow-md">
                    <img
                      src={processedPhoto}
                      alt="Processed Vision LLM Frame"
                      className="w-full h-full object-contain p-2 filter opacity-95"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultItem.processedImage || defaultItem.image;
                      }}
                    />

                    {/* Animated Bounding Container & Laser Scanner Beam */}
                    <div className="absolute inset-3 border border-cyan-400/80 rounded-xl pointer-events-none overflow-hidden">
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-scan-laser z-20"></div>
                    </div>

                    <span className="absolute top-2.5 left-2.5 bg-blue-600/90 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-blue-400 shadow flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping"></span>
                      🔍 VISION LLM MESH
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Completion Progress Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900">Audit Completion</span>
                <span className="text-2xl font-extrabold text-slate-900 font-mono">{progressPct}%</span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-0.5">
                <button onClick={handleSkipWait} className="text-blue-600 hover:underline font-bold text-[11px]">
                  Fast-Forward (Demo Speed)
                </button>
                <span>Estimated time remaining: {remainingSeconds}s</span>
              </div>
            </div>

            {/* Technical Validation Checklist Card */}
            <div className="bg-white rounded-2xl border border-blue-200/80 shadow-sm overflow-hidden">
              <div className="bg-blue-50/80 px-4 py-2.5 border-b border-blue-100 flex items-center gap-2 text-xs font-bold text-slate-900">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Technical Validation Checklist</span>
              </div>

              <div className="p-3 space-y-2.5">

                {/* Step 1 */}
                <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 space-y-0.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> Image quality verified
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">0.2s</span>
                  </div>
                  <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                    Resolution: 300 DPI, Lighting: Optimal, Blur Index: 0.02
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 space-y-0.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> Package detected
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">0.4s</span>
                  </div>
                  <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                    Bounding box mapped. Object type: Packaged Commodity.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 space-y-0.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" /> Vision LLM & Advanced OCR text extracted
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">1.1s</span>
                  </div>
                  <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                    Found 432 characters. Vision LLM Confidence: 98.7%.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-2.5 rounded-xl border-2 border-blue-500 shadow-sm space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin inline-block"></span>
                      Mandatory declarations being validated
                    </span>
                    <span className="text-[10px] font-mono font-bold text-blue-600">Running...</span>
                  </div>
                  <div className="pl-6 text-[11px] font-mono text-slate-700 space-y-0.5">
                    <div className="flex justify-between"><span>Net Quantity</span> <span className="text-blue-600 font-bold">✓</span></div>
                    <div className="flex justify-between"><span>MRP</span> <span className="text-blue-600 font-bold">✓</span></div>
                    <div className="flex justify-between"><span>Manufacturer Details</span> <span className="text-slate-400">...</span></div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-400 space-y-0.5">
                  <div className="flex justify-between items-center">
                    <span>Font size verification</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Pending contextual analysis</p>
                </div>

                {/* Step 6 */}
                <div className="p-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-400 space-y-0.5">
                  <div className="flex justify-between items-center">
                    <span>Legal rule validation</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Awaiting compliance engine matrix</p>
                </div>

              </div>

              {/* Cancel Action */}
              <div className="bg-blue-50/40 p-3 border-t border-blue-100 flex justify-end">
                <button
                  onClick={handleSkipWait}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-100 shadow-sm transition-all"
                >
                  Cancel Audit
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* Target Compliance Audit Result Screen */
          <div className="space-y-4">

            {/* Top Inspection Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest block">
                INSPECTION ID
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight leading-none">
                INS-2026-00098
              </h2>
              <p className="text-sm font-bold text-slate-800 pt-0.5">
                {analysis.name} • {analysis.netQuantity}
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Date: {analysis.date || "05 Sep 2026"}
              </p>

              {/* Status Banner Box */}
              <div className={`rounded-2xl p-4 flex items-center gap-3 border mt-3 ${isCompliant
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                : isReviewRequired
                  ? 'bg-amber-50/90 border-amber-200 text-amber-900'
                  : 'bg-rose-50/90 border-rose-200 text-rose-900'
                }`}>
                {isCompliant ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                ) : isReviewRequired ? (
                  <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0" />
                ) : (
                  <ShieldAlert className="w-7 h-7 text-rose-600 shrink-0" />
                )}

                <div>
                  <h3 className={`text-base font-extrabold tracking-wide ${isCompliant ? 'text-emerald-800' : isReviewRequired ? 'text-amber-800' : 'text-rose-800'
                    }`}>
                    {analysis.status}
                  </h3>
                  <p className={`text-xs font-semibold ${isCompliant ? 'text-emerald-600' : isReviewRequired ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                    {isCompliant ? '100% Match' : isReviewRequired ? 'Declarations Require Verification' : 'Rule Infractions Detected'}
                  </p>
                </div>
              </div>

            </div>

            {/* Dual Evidence Image Viewer Card (Bigger Display) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" /> Inspection Evidence Images
                </span>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  VISION LLM DUAL FEED
                </span>
              </div>

              <div className="space-y-4">
                {/* 1. RAW IMAGE (BIGGER) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                      1. Raw Captured Image (Original Label)
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      RAW FRAME
                    </span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] bg-slate-950 border border-slate-300 shadow-md group">
                    <img
                      src={rawPhoto}
                      alt="Raw Captured Evidence"
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultItem.rawImage || defaultItem.image;
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/90 text-white text-xs font-mono font-bold px-3 py-1 rounded-lg border border-slate-700 shadow-lg">
                      RAW IMAGE
                    </div>
                  </div>
                </div>

                {/* 2. PROCESSED VISION LLM IMAGE (BIGGER) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                      2. Processed Vision LLM Mesh (Bounding Overlay)
                    </span>
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      VISION LLM
                    </span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] bg-slate-950 border-2 border-blue-500/80 shadow-md group">
                    <img
                      src={processedPhoto}
                      alt="Processed Vision LLM Analyzed Evidence"
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultItem.processedImage || defaultItem.image;
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs font-mono font-bold px-3 py-1 rounded-lg border border-blue-400 shadow-lg flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></span>
                      PROCESSED VISION LLM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TOTAL DECLARATIONS Metric Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  TOTAL DECLARATIONS
                </span>
                <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                  {analysis.checks?.total || 10}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-blue-100/70 text-blue-700">
                <ClipboardList className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            {/* PASSED DECLARATIONS Metric Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  PASSED DECLARATIONS
                </span>
                <span className={`text-2xl font-extrabold font-mono mt-1 block ${isCompliant ? 'text-emerald-600' : isReviewRequired ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                  {passedCount}
                </span>
              </div>
              <div className={`p-3 rounded-2xl ${isCompliant
                ? 'bg-emerald-100/70 text-emerald-700'
                : isReviewRequired
                  ? 'bg-amber-100/70 text-amber-700'
                  : 'bg-rose-100/70 text-rose-700'
                }`}>
                <CheckCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            {/* Extracted Declarations Card Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              {/* Header */}
              <div className="bg-blue-50/80 px-5 py-3.5 border-b border-blue-100">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Extracted Declarations
                </h3>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100">
                {visibleDeclarations.map((item, idx) => (
                  <div key={idx} className="p-4 space-y-2">

                    {/* Item Header Title & Check */}
                    <div className="flex items-center gap-2">
                      {item.statusType === 'PASS' || item.status === 'Valid' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : item.statusType === 'REVIEW' || item.status === 'Review Required' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      ) : (
                        <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    </div>

                    {/* Extracted Value */}
                    <p className="text-xs text-slate-600 font-mono pl-7">
                      Extracted: '{item.value}'
                    </p>

                    {/* Badges Row */}
                    <div className="pl-7 flex flex-wrap gap-2 items-center pt-0.5">
                      <span className="bg-blue-100/80 text-blue-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-200">
                        {item.rule}
                      </span>
                      {item.height && (
                        <span className="bg-blue-100/80 text-blue-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-200">
                          {item.height}
                        </span>
                      )}
                    </div>

                    {/* Valid / Review Status Tag */}
                    <div className="pl-7 pt-1">
                      <span className={`font-semibold text-xs px-3 py-1 rounded-full border inline-block ${item.statusType === 'PASS' || item.status === 'Valid'
                        ? 'bg-emerald-100/80 text-emerald-700 border-emerald-200'
                        : item.statusType === 'REVIEW' || item.status === 'Review Required'
                          ? 'bg-amber-100/80 text-amber-800 border-amber-200'
                          : 'bg-rose-100/80 text-rose-700 border-rose-200'
                        }`}>
                        {item.status}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

              {/* View All Declarations Footer */}
              <div className="bg-blue-50/60 p-3 border-t border-blue-100 text-center">
                <button
                  onClick={() => setShowAllDeclarations(!showAllDeclarations)}
                  className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center justify-center gap-1.5"
                >
                  <span>
                    {showAllDeclarations ? "Show Less Declarations" : "View All 10 Declarations"}
                  </span>
                  {showAllDeclarations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

            </div>

            {/* Actions Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex gap-2.5">
                <button
                  onClick={() => navigate('/evidence-review')}
                  className="flex-1 py-3.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>Inspect Evidence</span>
                </button>

                <button
                  onClick={() => navigate('/inspection-detail')}
                  className="flex-1 py-3.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                >
                  <Landmark className="w-4 h-4 text-blue-600" />
                  <span>Audit Record</span>
                </button>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => navigate('/violation-details')}
                  className="flex-1 py-3 px-3 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Violation Breakdown</span>
                </button>

                <button
                  onClick={() => navigate('/report-preview')}
                  className="flex-1 py-3 px-4 bg-[#0a0f1d] hover:bg-slate-900 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all uppercase tracking-wider"
                >
                  <FileText className="w-4 h-4" />
                  <span>Report Preview</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      <EvidenceModal
        isOpen={showEvidence}
        onClose={() => setShowEvidence(false)}
        analysis={analysis}
      />
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        analysis={analysis}
        officer={officer}
      />

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
