import React, { useState } from 'react';
import { Calendar, X, RotateCcw } from 'lucide-react';

export default function HistoryFilterModal({ isOpen, onClose, filters, onApplyFilters }) {
  const [selectedStatuses, setSelectedStatuses] = useState(filters?.statuses || ['COMPLIANT', 'NON-COMPLIANT', 'PENDING']);
  const [fromDate, setFromDate] = useState(filters?.fromDate || '2026-09-01');
  const [toDate, setToDate] = useState(filters?.toDate || '2026-09-10');

  if (!isOpen) return null;

  const toggleStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const handleReset = () => {
    setSelectedStatuses(['COMPLIANT', 'NON-COMPLIANT', 'PENDING']);
    setFromDate('2026-09-01');
    setToDate('2026-09-10');
  };

  const handleApply = () => {
    onApplyFilters({
      statuses: selectedStatuses,
      fromDate,
      toDate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-t-3xl md:rounded-2xl shadow-2xl p-5 border border-slate-100 animate-in slide-in-from-bottom duration-250">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-base font-bold text-slate-900">Filters</h3>
          <button 
            onClick={handleReset}
            className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        {/* Compliance Status Options */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Compliance Status</h4>
          <div className="space-y-2.5">
            {[
              { id: 'COMPLIANT', label: 'Compliant', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
              { id: 'NON-COMPLIANT', label: 'Non-Compliant', color: 'text-rose-700 bg-rose-50 border-rose-200' },
              { id: 'PENDING', label: 'Pending', color: 'text-amber-700 bg-amber-50 border-amber-200' }
            ].map(item => {
              const isChecked = selectedStatuses.includes(item.id);
              return (
                <label 
                  key={item.id}
                  onClick={() => toggleStatus(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    isChecked ? `${item.color} shadow-sm` : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} 
                      className="w-4 h-4 rounded text-blue-900 accent-blue-900"
                    />
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Date Range (2026 constrained) */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Date Range</h4>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-500 mb-1 block">From</label>
              <div className="relative">
                <input 
                  type="date"
                  value={fromDate}
                  min="2026-09-01"
                  max="2026-09-10"
                  onChange={e => setFromDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-900"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[11px] text-slate-500 mb-1 block">To</label>
              <div className="relative">
                <input 
                  type="date"
                  value={toDate}
                  min="2026-09-01"
                  max="2026-09-10"
                  onChange={e => setToDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-900"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleApply}
          className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-md active:scale-[0.99] transition-all text-xs uppercase tracking-wider"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
