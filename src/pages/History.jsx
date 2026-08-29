import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, SlidersHorizontal, ShieldCheck, AlertOctagon, Clock } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import HistoryFilterModal from '../components/Modals/HistoryFilterModal';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function History() {
  const navigate = useNavigate();
  const { inspections, setActiveAnalysis } = useAuthInspection();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterState, setFilterState] = useState({
    statuses: ['COMPLIANT', 'NON-COMPLIANT', 'PENDING'],
    fromDate: '2026-09-01',
    toDate: '2026-09-10'
  });

  const handleOpenDetail = (item) => {
    setActiveAnalysis(item);
    navigate('/scan-result');
  };

  // Filter computation logic
  const filteredInspections = inspections.filter((item) => {
    // 1. Search Query Filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) || 
      (item.category && item.category.toLowerCase().includes(query)) ||
      (item.id && item.id.toLowerCase().includes(query));

    // 2. Tab Filter
    const matchesTab = activeTab === 'ALL' || item.status === activeTab;

    // 3. Modal Status Filter
    const matchesModalStatus = filterState.statuses.includes(item.status);

    return matchesSearch && matchesTab && matchesModalStatus;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <Header 
        title="History" 
        rightAction={
          <button 
            onClick={() => setShowFilterModal(true)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors relative"
            aria-label="Open Filters"
          >
            <Filter className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
        
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-900">Inspection History</h2>
          <span className="text-xs font-bold text-slate-500 font-mono">
            {filteredInspections.length} Records
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products or inspections"
            className="w-full px-3.5 py-2.5 pl-10 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900 shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        {/* Filter Pills Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'COMPLIANT', label: 'Compliant' },
            { id: 'NON-COMPLIANT', label: 'Non-Compliant' },
            { id: 'PENDING', label: 'Pending' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-blue-900 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Inspection List Items */}
        <div className="space-y-2.5">
          {filteredInspections.length > 0 ? (
            filteredInspections.map((item) => {
              const isCompliant = item.status === 'COMPLIANT';
              const isNonCompliant = item.status === 'NON-COMPLIANT';

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenDetail(item)}
                  className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-blue-300 transition-all cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 bg-slate-100 shrink-0" 
                    />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">{item.name}</h3>
                      <p className="text-[11px] text-slate-500 font-medium">{item.netQuantity}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.date} • {item.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                      isCompliant 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : isNonCompliant 
                          ? 'bg-rose-50 text-rose-700 border-rose-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center my-6">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No inspections found</p>
              <p className="text-[11px] text-slate-500 mt-1">Try adjusting your search keywords or filter criteria.</p>
            </div>
          )}
        </div>

      </div>

      {/* History Filter Modal */}
      <HistoryFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filterState}
        onApplyFilters={setFilterState}
      />

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
