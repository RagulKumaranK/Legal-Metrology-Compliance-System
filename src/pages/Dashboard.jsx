import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scan, FileText, ShieldCheck, AlertOctagon, Clock, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { officer, inspections, setActiveAnalysis } = useAuthInspection();

  // Metrics computation from inspections list
  const totalCount = inspections.length;
  const compliantCount = inspections.filter(i => i.status === 'COMPLIANT').length;
  const nonCompliantCount = inspections.filter(i => i.status === 'NON-COMPLIANT').length;
  const pendingCount = inspections.filter(i => i.status === 'PENDING').length;

  const recentInspections = inspections.slice(0, 4);

  const handleOpenInspection = (item) => {
    setActiveAnalysis(item);
    navigate('/scan-result');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Bar Header */}
      <Header />

      {/* Main Content Body */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {/* Today's Overview Banner Card */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-2xl p-4 shadow-xl relative overflow-hidden border border-blue-900/40">
          
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold tracking-tight">Today's Overview</h2>
            <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-0.5 rounded-full text-slate-200 backdrop-blur-sm border border-white/10 font-mono">
              05 Sep 2026
            </span>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            
            {/* Total Inspections */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-medium leading-none">Total Inspections</p>
                <p className="text-xl font-black text-white mt-1">{totalCount}</p>
              </div>
            </div>

            {/* Compliant */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-medium leading-none">Compliant</p>
                <p className="text-xl font-black text-white mt-1">{compliantCount}</p>
              </div>
            </div>

            {/* Non-Compliant */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-medium leading-none">Non-Compliant</p>
                <p className="text-xl font-black text-white mt-1">{nonCompliantCount}</p>
              </div>
            </div>

            {/* Pending */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-medium leading-none">Pending</p>
                <p className="text-xl font-black text-white mt-1">{pendingCount}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Large Scan Product Primary Action Button */}
        <button
          onClick={() => navigate('/scan')}
          className="w-full py-4 px-6 bg-blue-900 hover:bg-blue-950 text-white rounded-2xl shadow-xl border border-blue-800 flex items-center justify-center gap-3 transition-all active:scale-[0.98] group"
        >
          <div className="p-2 rounded-xl bg-white/10 text-white group-hover:scale-110 transition-transform">
            <Scan className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-sm font-bold tracking-wide uppercase">Scan Product</span>
        </button>

        {/* Recent Inspections Header & List */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Recent Inspections</h3>
            <Link to="/history" className="text-xs font-bold text-blue-900 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentInspections.map((item) => {
              const isCompliant = item.status === 'COMPLIANT';
              const isNonCompliant = item.status === 'NON-COMPLIANT';

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenInspection(item)}
                  className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-blue-300 transition-all cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 bg-slate-100 shrink-0" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">{item.date} • {item.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
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
            })}
          </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
