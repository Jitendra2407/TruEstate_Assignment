import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', active: true },
    { name: 'Nexus', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Intake', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  const services = ['Pre-active', 'Active', 'Blocked', 'Closed'];
  const invoices = ['Proforma Invoices', 'Final Invoices'];

  return (
    <div className="w-64 bg-slate-50 border-r border-gray-200 h-screen flex flex-col font-sans">
      {/* Profile Header */}
      <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold">V</div>
        <div>
           <h3 className="text-sm font-bold text-gray-900">Vault</h3>
           <p className="text-xs text-gray-500">Jitendra Thakur</p>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => (
          <button key={item.name} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${item.active ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
            <span>{item.name}</span>
          </button>
        ))}

        {/* Services Section */}
        <div className="pt-4">
            <h4 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between cursor-pointer">
                <span>Services</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
            </h4>
            <div className="space-y-1 pl-2">
                {services.map(s => (
                    <button key={s} className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900">
                        {s === 'Active' ? <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center"><span className="w-2 h-2 bg-gray-400 rounded-full"></span></span> : 
                         s === 'Blocked' ? <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">x</span> :
                        <span className="w-4 h-4 rounded-full border border-gray-300"></span>}
                        <span>{s}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Invoices Section */}
        <div className="pt-4">
             <h4 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between cursor-pointer">
                <span>Invoices</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
            </h4>
             <div className="space-y-1 pl-2">
                {invoices.map(inv => (
                    <button key={inv} className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span>{inv}</span>
                    </button>
                ))}
            </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
