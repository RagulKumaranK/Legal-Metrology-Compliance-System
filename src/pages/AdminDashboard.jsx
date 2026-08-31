import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Search, FileCheck, Package, FileText, AlertOctagon, 
  BarChart3, Users, Settings, Bell, ChevronDown, Download, Eye, 
  Filter, Sparkles, ShieldCheck, Smartphone, CheckCircle2, AlertTriangle
} from 'lucide-react';
import GovernmentEmblem from '../components/GovernmentEmblem';
import heroImg from '../assets/hero.png';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { officer, inspections, setActiveAnalysis } = useAuthInspection();

  const [activeNav, setActiveNav] = useState('Search / Inspect');
  const [activeTab, setActiveTab] = useState('Inspection ID');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Search / Inspect', icon: Search },
    { label: 'Inspections', icon: FileCheck },
    { label: 'Products', icon: Package },
    { label: 'Reports', icon: FileText },
    { label: 'Violations', icon: AlertOctagon },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Users', icon: Users },
    { label: 'Settings', icon: Settings }
  ];

  const searchTabs = ['Inspection ID', 'Product Name', 'Barcode / GTIN', 'Manufacturer', 'Date Range'];
  const recentSearches = ['INS-2026-001', 'Whole Wheat Atta', 'Choco-filled Wafer Stick', 'Britannia Biscuits'];

  const filteredInspections = inspections.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenDetail = (item) => {
    setActiveAnalysis({ ...item, isNewScan: false });
    navigate('/scan-result');
  };

  const handleExportCsv = () => {
    const headers = "Inspection ID,Product Name,Category,Date,Status,Violations\n";
    const rows = filteredInspections.map(i => 
      `"${i.id}","${i.name}","${i.category}","${i.date}","${i.status}","${i.checks?.violations || 0}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LegalMetrology_Inspections_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-5 z-20">
        <div className="space-y-6">
          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-extrabold shadow-2xs border border-blue-100' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Switch to Mobile App Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>Mobile App View</span>
          </button>
        </div>
      </aside>

      {/* Main Desktop Dashboard Frame */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar with Accent Strip */}
        <header className="bg-white border-b border-slate-200 shrink-0 relative z-30">
          <div className="h-1 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800"></div>
          
          <div className="h-16 px-6 flex items-center justify-between">
            {/* Header Branding */}
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center">
                <img src={heroImg} alt="Legal Metro Logo" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h1 className="text-xs font-black uppercase tracking-tight text-slate-900 leading-tight">
                  LEGAL METROLOGY COMPLIANCE SYSTEM
                </h1>
                <p className="text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest pt-0.5">
                  Govt. of India • Legal Metrology Enforcement Portal
                </p>
              </div>
            </div>

            {/* Center Search Input */}
            <div className="flex items-center gap-4 flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search inspections, products, reports... Ctrl + K"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs font-mono border border-blue-200">
                  OS
                </div>
                <div className="text-left">
                  <span className="text-xs font-extrabold text-slate-900 block leading-tight">
                    {officer?.name || 'Officer Sharma'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    Enforcement Officer
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8 space-y-6 overflow-y-auto">
          
          {/* Title Banner Header */}
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Search Inspections / Products
            </h2>
            <p className="text-xs text-slate-500 font-medium pt-0.5">
              Search and retrieve inspection records, products or reports
            </p>
          </div>

          {/* Search & Filter Options Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
            
            {/* Search Tab Strips */}
            <div className="flex border-b border-slate-200 gap-6">
              {searchTabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs font-bold transition-all relative ${
                      isActive ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{tab}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Input Bar & Actions */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Enter ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <button className="px-6 py-2.5 bg-[#0b192e] hover:bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 uppercase tracking-wider">
                <Search className="w-4 h-4 text-white" />
                <span>Search</span>
              </button>

              <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span>Filters</span>
              </button>
            </div>

            {/* Recent Searches Pills */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Recent Searches:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSearchQuery(s)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Total Records</span>
                <h4 className="text-xl font-black font-mono text-slate-900">{inspections.length}</h4>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <FileCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Compliant</span>
                <h4 className="text-xl font-black font-mono text-emerald-600">
                  {inspections.filter(i => i.status === 'COMPLIANT').length}
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Review / Non-Compliant</span>
                <h4 className="text-xl font-black font-mono text-amber-600">
                  {inspections.filter(i => i.status === 'REVIEW REQUIRED' || i.status === 'NON-COMPLIANT').length}
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Pending Audit</span>
                <h4 className="text-xl font-black font-mono text-slate-600">
                  {inspections.filter(i => i.status === 'PENDING' || i.status === 'REVIEW').length}
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search Results Data Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Table Header Strip */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Search Results ({filteredInspections.length})
              </h3>

              <button 
                onClick={handleExportCsv}
                className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Table Data */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 font-mono">
                  <tr>
                    <th className="py-3 px-6">Inspection ID</th>
                    <th className="py-3 px-6">Product</th>
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6">Inspection Date</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-center">Violations</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredInspections.map((item) => {
                    const isCompliant = item.status === 'COMPLIANT';
                    const isReview = item.status === 'REVIEW REQUIRED' || item.status === 'REVIEW';
                    const isNonCompliant = item.status === 'NON-COMPLIANT';

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-6 font-mono font-extrabold text-slate-900">
                          {item.id}
                        </td>
                        
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || item.rawImage}
                              alt={item.name}
                              className="w-9 h-9 rounded-lg object-contain bg-slate-50 border border-slate-200 p-0.5 shrink-0"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://res.cloudinary.com/dckqgzfes/image/upload/v1788092960/original1_dxvuhf.png';
                              }}
                            />
                            <div>
                              <span className="font-bold text-slate-900 block">{item.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono block">{item.netQuantity}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-6 font-medium text-slate-600">
                          {item.category || 'Packaged Foods'}
                        </td>

                        <td className="py-3.5 px-6 font-mono text-slate-600">
                          {item.date || '05 Sep 2026'}
                        </td>

                        <td className="py-3.5 px-6">
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border tracking-wide uppercase font-mono ${
                            isCompliant
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isReview
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-6 text-center font-mono font-bold">
                          <span className={item.checks?.violations > 0 ? 'text-rose-600' : 'text-slate-500'}>
                            {item.checks?.violations || (isCompliant ? 0 : isReview ? 0 : 3)}
                          </span>
                        </td>

                        <td className="py-3.5 px-6 text-center">
                          <button
                            onClick={() => handleOpenDetail(item)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="View Inspection Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
