import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scan, Calendar, FileCheck, CheckCircle2, AlertOctagon, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { officer, inspections, setActiveAnalysis } = useAuthInspection();

  const displayList = inspections && inspections.length > 0 ? inspections : [];
  const totalCount = displayList.length;
  const compliantCount = displayList.filter(i => i.status === 'COMPLIANT').length;
  const nonCompliantCount = displayList.filter(i => i.status === 'NON-COMPLIANT' || i.status === 'REVIEW REQUIRED').length;
  const pendingCount = displayList.filter(i => i.status === 'PENDING' || i.status === 'REVIEW').length;

  const recentInspections = displayList.slice(0, 5);

  const handleOpenInspection = (item) => {
    setActiveAnalysis({ ...item, isNewScan: false });
    navigate('/scan-result');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">

      <Header />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-5 pb-24 space-y-4 overflow-y-auto">
        
        {/* Officer Greeting Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Good Morning, {officer?.name || "Officer Sharma"}
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-600 pt-0.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>05 Sep 2026</span>
          </div>
        </div>

        {/* Primary SCAN COMMODITY LABEL CTA */}
        <button
          onClick={() => navigate('/scan')}
          className="w-full py-3.5 bg-[#0a0f1d] hover:bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-[0.99]"
        >
          <Scan className="w-4 h-4 text-white" />
          <span>SCAN COMMODITY LABEL</span>
        </button>

        {/* 2x2 Operational Statistics Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Card 1: Total Inspections */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-600 leading-tight">Total<br />Inspections</span>
              <div className="p-2 rounded-xl bg-blue-100/70 text-blue-700 shrink-0">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 mt-2 font-mono">{totalCount}</span>
          </div>

          {/* Card 2: Compliant */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-600 leading-tight">Compliant</span>
              <div className="p-2 rounded-xl bg-blue-100/70 text-blue-700 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 mt-2 font-mono">{compliantCount}</span>
          </div>

          {/* Card 3: Non-Compliant */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-600 leading-tight">Non-Compliant</span>
              <div className="p-2 rounded-xl bg-rose-100/70 text-rose-700 shrink-0">
                <AlertOctagon className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-rose-600 mt-2 font-mono">{nonCompliantCount}</span>
          </div>

          {/* Card 4: Pending */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-600 leading-tight">Pending</span>
              <div className="p-2 rounded-xl bg-blue-100/70 text-blue-700 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-600 mt-2 font-mono">{pendingCount}</span>
          </div>

        </div>

        {/* Recent Audit Trail Section */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Audit Trail</h3>
            <Link to="/history" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Audit Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="bg-blue-50/80 px-4 py-2.5 border-b border-blue-100 flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Commodity</span>
              <span>Status</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {recentInspections.length > 0 ? (
                recentInspections.map((item) => {
                  const isCompliant = item.status === 'COMPLIANT';
                  const isNonCompliant = item.status === 'NON-COMPLIANT';

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleOpenInspection(item)}
                      className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-contain bg-slate-50 border border-slate-200 p-0.5 shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://res.cloudinary.com/dckqgzfes/image/upload/v1788092960/original1_dxvuhf.png';
                          }}
                        />
                        <span className="text-xs font-bold text-slate-900 truncate">{item.name}</span>
                      </div>

                      <div className="shrink-0">
                        <span className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all ${
                          isCompliant
                            ? 'bg-blue-100/80 text-blue-700 border-blue-200'
                            : isNonCompliant
                              ? 'bg-rose-100/80 text-rose-700 border-rose-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {isCompliant ? 'Compliant' : isNonCompliant ? 'Non-Compliant' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-slate-500">
                  No recent audit records found.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
