'use client';

import { useState } from 'react';
import { Building2, PlusCircle, Search, MoreVertical, CheckCircle2, XCircle, Trash2, PauseCircle, Eye, X, Save } from 'lucide-react';

interface LawFirmUser {
  id: number;
  firmName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  status: 'Active' | 'Suspended';
  joinedAt: string;
}

const mock: LawFirmUser[] = [
  { id: 1, firmName: 'Chen & Associates',  ownerName: 'Sarah Chen',     email: 'sarah@chenlaw.com',   phone: '+91 98100 11111', city: 'Mumbai',    status: 'Active',    joinedAt: '12 Jan 2024' },
  { id: 2, firmName: 'Torres Law Group',   ownerName: 'Michael Torres', email: 'mike@torreslaw.com',  phone: '+91 98200 22222', city: 'Delhi',     status: 'Active',    joinedAt: '5 Mar 2024'  },
  { id: 3, firmName: 'Davis Legal',        ownerName: 'Emily Davis',    email: 'emily@davislegal.com',phone: '+91 98300 33333', city: 'Bangalore', status: 'Suspended', joinedAt: '9 May 2024'  },
];

const emptyForm = { firmName: '', ownerName: '', email: '', phone: '', username: '', password: '', city: '', state: '', country: 'India' };

export default function LawFirmsPage() {
  const [users, setUsers] = useState(mock);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = users.filter(u =>
    u.firmName.toLowerCase().includes(query.toLowerCase()) ||
    u.ownerName.toLowerCase().includes(query.toLowerCase())
  );

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleAdd = () => {
    if (!form.firmName || !form.email) return;
    setUsers(p => [...p, {
      id: Date.now(), firmName: form.firmName, ownerName: form.ownerName,
      email: form.email, phone: form.phone, city: form.city,
      status: 'Active', joinedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    }]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const toggleStatus = (id: number) =>
    setUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  const remove = (id: number) => setUsers(p => p.filter(u => u.id !== id));

  const fields = [
    { k: 'firmName',  l: 'Firm Name',  ph: 'e.g. Chen & Associates' },
    { k: 'ownerName', l: 'Owner Name', ph: 'Full name' },
    { k: 'email',     l: 'Email',      ph: 'owner@firm.com', type: 'email' },
    { k: 'phone',     l: 'Phone',      ph: '+91 98765 43210', type: 'tel' },
    { k: 'username',  l: 'Username',   ph: 'login username' },
    { k: 'password',  l: 'Password',   ph: '••••••••', type: 'password' },
    { k: 'city',      l: 'City',       ph: 'Mumbai' },
    { k: 'state',     l: 'State',      ph: 'Maharashtra' },
    { k: 'country',   l: 'Country',    ph: 'India' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0e2340]">Law Firm Users</h1>
          <p className="text-sm text-gray-400 mt-0.5">Add and manage law firm accounts on the platform</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-[#6C5CE7] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5a4bd1] transition-colors shadow-sm"
        >
          {showForm ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Law Firm'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-8 h-8 bg-[#6C5CE7] rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0e2340]">New Law Firm Account</p>
              <p className="text-xs text-gray-400">Fill in all required fields to register</p>
            </div>
          </div>
          <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map(({ k, l, ph, type }) => (
              <div key={k} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{l}</label>
                <input
                  type={type ?? 'text'}
                  value={(form as any)[k]}
                  onChange={e => set(k, e.target.value)}
                  placeholder={ph}
                  className="h-10 px-3.5 rounded-xl border border-gray-200 bg-[#f7f8fa] text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10 transition-all"
                />
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button onClick={handleAdd} className="flex items-center gap-2 bg-[#6C5CE7] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5a4bd1] transition-colors">
              <Save className="w-4 h-4" /> Save Law Firm
            </button>
            <button onClick={() => { setForm(emptyForm); setShowForm(false); }} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-[#0e2340]">{users.length} Law Firms registered</p>
          <div className="flex items-center gap-2 bg-[#f7f8fa] border border-gray-100 rounded-xl px-3 py-2 w-56">
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search firms…" className="bg-transparent text-sm text-gray-600 placeholder:text-gray-400 outline-none w-full" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-[#f7f8fa] border-b border-gray-100">
                {['Firm', 'Email', 'Phone', 'City', 'Status', 'Joined', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[#f7f8fa]/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#6C5CE7]/10 flex items-center justify-center text-[#6C5CE7] text-[11px] font-bold shrink-0">
                        {u.firmName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0e2340]">{u.firmName}</p>
                        <p className="text-[11px] text-gray-400">{u.ownerName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{u.email}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{u.phone}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{u.city}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-500 border border-red-100'
                    }`}>
                      {u.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{u.joinedAt}</td>
                  <td className="px-5 py-3.5 relative">
                    <button onClick={() => setOpenMenu(openMenu === u.id ? null : u.id)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    {openMenu === u.id && (
                      <div className="absolute right-6 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1">
                        <button onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                          <Eye className="w-3.5 h-3.5 text-gray-400" /> View Details
                        </button>
                        <button onClick={() => { toggleStatus(u.id); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-amber-600 hover:bg-amber-50">
                          <PauseCircle className="w-3.5 h-3.5" /> {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                        </button>
                        <div className="h-px bg-gray-100 my-1" />
                        <button onClick={() => { remove(u.id); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-100 bg-[#f7f8fa]">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {users.length} entries</p>
        </div>
      </div>
    </div>
  );
}