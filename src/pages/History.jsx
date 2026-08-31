import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, AlertOctagon, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function History() {
  const navigate = useNavigate();
  const { inspections, setActiveAnalysis } = useAuthInspection();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const handleOpenDetail = (item) => {
    setActiveAnalysis({ ...item, isNewScan: false });
    navigate('/inspection-detail');
  };

  const filteredInspections = inspections.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) || 
      (item.category && item.category.toLowerCase().includes(query)) ||
      (item.id && item.id.toLowerCase().includes(query));

    const matchesTab = activeTab === 'ALL' || item.status === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">
      
      <Header />

      {/* Main Audit History Body */}
      <div className="flex-1 p-5 pb-24 space-y-4 overflow-y-auto">
        
        {/* Title & Subtitle */}
        <div className="space-y-0.5">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Audit History
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Commodity Verification Ledger
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by commodity or ID"
            className="w-full px-3.5 py-2.5 pl-10 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filter Tabs Row */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'COMPLIANT', label: 'Compliant' },
            { id: 'NON-COMPLIANT', label: 'Violations' },
            { id: 'PENDING', label: 'Pending' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isActive 
                    ? 'bg-[#0a0f1d] text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Inspection History Cards List */}
        <div className="space-y-4 pt-1">
          {filteredInspections.length > 0 ? (
            filteredInspections.map((item) => {
              const isCompliant = item.status === 'COMPLIANT';
              const isNonCompliant = item.status === 'NON-COMPLIANT';
              const isPending = item.status === 'PENDING';

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenDetail(item)}
                  className="rounded-2xl border shadow-sm overflow-hidden bg-white cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                  style={{
                    borderColor: isNonCompliant ? '#fecdd3' : '#dbeafe'
                  }}
                >
                  {/* Card Header Bar */}
                  <div className={`px-4 py-2 border-b flex justify-between items-center ${
                    isNonCompliant 
                      ? 'bg-rose-50 border-rose-200' 
                      : 'bg-blue-50/80 border-blue-100'
                  }`}>
                    <span className={`text-xs font-mono font-bold ${
                      isNonCompliant ? 'text-rose-800' : 'text-slate-700'
                    }`}>
                      ID: {item.id}
                    </span>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 ${
                      isCompliant 
                        ? 'bg-blue-500 text-white' 
                        : isNonCompliant 
                          ? 'bg-rose-700 text-white' 
                          : 'bg-slate-200 text-slate-700'
                    }`}>
                      {isCompliant ? <CheckCircle2 className="w-3 h-3" /> : isNonCompliant ? <AlertOctagon className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {isCompliant ? 'Compliant' : isNonCompliant ? 'Violation' : 'Pending'}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{item.name}</h3>
                      <p className="text-xs text-slate-600 font-medium">{item.manufacturer || item.category || "Legal Metrology Verified"}</p>
                    </div>

                    {/* Declared Wt vs Measured Wt Row */}
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div>
                        <span className="text-xs text-slate-500 block">Declared Wt.</span>
                        <span className="text-sm font-extrabold text-slate-900 font-mono block mt-0.5">
                          {item.netQuantity}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs text-slate-500 block">Measured Wt.</span>
                        <span className={`text-sm font-extrabold font-mono block mt-0.5 ${
                          isNonCompliant ? 'text-rose-700' : isPending ? 'text-slate-500 italic font-semibold text-xs' : 'text-slate-900'
                        }`}>
                          {isPending ? 'Pending Lab' : item.fontSizeAnalysis?.[1]?.measuredSize || item.netQuantity}
                        </span>
                      </div>
                    </div>

                    {/* Violation Infraction Warning Badge */}
                    {isNonCompliant && (
                      <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-rose-700">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Short Weight / Rule 9 Infraction</span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Bar */}
                  <div className="bg-blue-50/50 px-4 py-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-mono">
                      Insp: {item.date}
                    </span>

                    <span className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center my-4 shadow-sm">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No audit records found</p>
              <p className="text-[11px] text-slate-500 mt-1">Try adjusting your search filter.</p>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
