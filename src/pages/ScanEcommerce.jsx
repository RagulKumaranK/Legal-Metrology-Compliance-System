import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Globe, Link2, CheckCircle2, ArrowRight, ShieldCheck, Zap, AlertCircle, Copy } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function ScanEcommerce() {
  const navigate = useNavigate();
  const { triggerNextScanSequence } = useAuthInspection();

  const [selectedPlatform, setSelectedPlatform] = useState('Amazon');
  const [productUrl, setProductUrl] = useState('https://www.amazon.in/dp/B08X5KNW77');
  const [isScraping, setIsScraping] = useState(false);

  const platforms = [
    { id: 'Amazon', name: 'Amazon India', domain: 'amazon.in', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'Flipkart', name: 'Flipkart', domain: 'flipkart.com', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300' },
    { id: 'Zepto', name: 'Zepto', domain: 'zeptonow.com', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
    { id: 'Blinkit', name: 'Blinkit', domain: 'blinkit.com', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' }
  ];

  const sampleUrls = {
    Amazon: 'https://www.amazon.in/dp/B08X5KNW77?th=1',
    Flipkart: 'https://www.flipkart.com/packaged-food-item/p/itm29841',
    Zepto: 'https://www.zeptonow.com/pn/whole-wheat-atta-5kg',
    Blinkit: 'https://blinkit.com/prn/choco-wafer-stick-45g'
  };

  const handleSelectPlatform = (platformId) => {
    setSelectedPlatform(platformId);
    setProductUrl(sampleUrls[platformId] || 'https://www.amazon.in/dp/B08X5KNW77');
  };

  const handlePasteUrl = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.startsWith('http')) {
        setProductUrl(text);
      }
    } catch (err) {}
  };

  const handleStartAnalysis = () => {
    setIsScraping(true);
    setTimeout(() => {
      triggerNextScanSequence(null, true);
      navigate('/scan-result');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">
      
      <Header showBack={true} onBack={() => navigate('/scan')} title="SCAN E-COMMERCE LISTING" />

      {/* Main Content Area */}
      <div className="flex-1 p-4 pb-28 space-y-4 overflow-y-auto">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                E-Commerce Listing Compliance Audit
              </h2>
              <p className="text-xs text-slate-500 font-medium pt-0.5">
                Playwright Automated Scrape & Vision LLM Listing Gating
              </p>
            </div>
          </div>
        </div>

        {/* Marketplace Platform Selector */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 font-mono block">
            Select Marketplace Platform
          </label>
          <div className="grid grid-cols-2 gap-2">
            {platforms.map(p => {
              const isSelected = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPlatform(p.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-xs' 
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-black text-slate-900">{p.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">{p.domain}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product URL Input Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Product Listing URL</span>
            </label>
            <button 
              onClick={handlePasteUrl}
              className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200 hover:bg-blue-100 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>PASTE</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Link2 className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="Paste marketplace product link here..."
              className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            Automated crawler extracts product images, specifications, price declarations, and seller info.
          </p>
        </div>

        {/* Legal Metrology E-Commerce Rules Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Rule 6 + E-Commerce Mandatory Checks</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">1. Country of Origin Listing Declaration</span>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">MANDATORY</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">2. MRP & Unit Sale Price (USP) Display</span>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">MANDATORY</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">3. Manufacturer / Packer Complete Address</span>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">MANDATORY</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">4. High-Res Package Label Image Visibility</span>
              <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">AI OCR CHECK</span>
            </div>
          </div>
        </div>

        {/* Start Analysis CTA Button */}
        <button
          onClick={handleStartAnalysis}
          disabled={isScraping}
          className="w-full py-4 bg-[#0a0f1d] hover:bg-slate-900 text-white font-extrabold rounded-2xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] border border-slate-800 disabled:opacity-75"
        >
          {isScraping ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>SCRAPING & AUDITING LISTING...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-amber-400" />
              <span>ANALYZE E-COMMERCE LISTING</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </>
          )}
        </button>

      </div>

      <BottomNav />

    </div>
  );
}
