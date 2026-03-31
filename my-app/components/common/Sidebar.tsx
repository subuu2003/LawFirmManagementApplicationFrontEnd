'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale, LayoutDashboard, Building2, BarChart3,
  Settings, ChevronRight, LogOut, Users,
  Briefcase, UserCheck, TrendingUp, ChevronDown,
} from 'lucide-react';

const userSubItems = [
  { label: 'Law Firms',       path: '/admin/firms',       icon: Building2  },
  { label: 'Partner Manager', path: '/admin/partner',    icon: UserCheck  },
  { label: 'Sales Person',    path: '/admin/users/sales',    icon: TrendingUp },
];

const navItems = [
  { label: 'Dashboard', path: '/admin',           icon: LayoutDashboard },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3       },
  { label: 'Settings',  path: '/admin/settings',  icon: Settings        },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(
    () => pathname.startsWith('/admin/users')
  );

  useEffect(() => {
    if (pathname.startsWith('/admin/users')) setUserMenuOpen(true);
  }, [pathname]);

  const isActive = (path: string) =>
    path === '/admin' ? pathname === '/admin' : pathname.startsWith(path);

  const userSectionActive = pathname.startsWith('/admin/users');

  /* shared styles */
  const navRow = (active: boolean) =>
    `group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
      active ? 'bg-[#0e2340]/8 text-[#0e2340]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
    }`;
  const iconBox = (active: boolean) =>
    `w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
      active ? 'bg-[#0e2340]/10' : 'bg-gray-100 group-hover:bg-gray-200'
    }`;
  const iconColor = (active: boolean) =>
    `w-4 h-4 ${active ? 'text-[#0e2340]' : 'text-gray-400 group-hover:text-gray-600'}`;

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#0e2340] rounded-lg flex items-center justify-center shadow-md">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            Lex<span className="text-[#0e2340]">Manage</span>
          </span>
        </div>
        <div className="mt-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Platform Admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">

        {/* Dashboard */}
        {(() => {
          const { label, path, icon: Icon } = navItems[0];
          const active = isActive(path);
          return (
            <Link href={path}>
              <div className={navRow(active)}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[22px] rounded-r-full bg-[#0e2340]" />}
                <div className="flex items-center gap-3">
                  <div className={iconBox(active)}><Icon className={iconColor(active)} /></div>
                  <span className="text-sm font-semibold">{label}</span>
                </div>
                {active && <ChevronRight className="w-3.5 h-3.5 text-[#0e2340]/40" />}
              </div>
            </Link>
          );
        })()}

        {/* User Management — collapsible */}
        <div>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setUserMenuOpen((o) => !o); }}
            className={navRow(userSectionActive) + ' w-full'}
          >
            {userSectionActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[22px] rounded-r-full bg-[#0e2340]" />
            )}
            <div className="flex items-center gap-3">
              <div className={iconBox(userSectionActive)}>
                <Users className={iconColor(userSectionActive)} />
              </div>
              <span className="text-sm font-semibold">User Management</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${userMenuOpen ? 'rotate-180 text-[#0e2340]' : 'text-gray-300'}`} />
          </button>

          {/* Sub-items */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${userMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-[22px] mt-1 mb-1 border-l-2 border-[#0e2340]/15 pl-3.5 space-y-0.5">
              {userSubItems.map(({ label, path, icon: Icon }) => {
                const active = pathname === path;
                return (
                  <Link key={path} href={path}>
                    <div className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer ${
                      active ? 'bg-[#0e2340]/8 text-[#0e2340]' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'
                    }`}>
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#0e2340]' : 'text-gray-300 group-hover:text-gray-500'}`} />
                      <span className={`text-[13px] font-semibold ${active ? 'text-[#0e2340]' : ''}`}>{label}</span>
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0e2340]" />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Firms, Analytics, Settings */}
        {navItems.slice(1).map(({ label, path, icon: Icon }) => {
          const active = isActive(path);
          return (
            <Link key={path} href={path}>
              <div className={navRow(active)}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[22px] rounded-r-full bg-[#0e2340]" />}
                <div className="flex items-center gap-3">
                  <div className={iconBox(active)}><Icon className={iconColor(active)} /></div>
                  <span className="text-sm font-semibold">{label}</span>
                </div>
                {active && <ChevronRight className="w-3.5 h-3.5 text-[#0e2340]/40" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom user card */}
      <div className="border-t border-gray-100">
        <div className="px-4 py-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0e2340] flex items-center justify-center text-white text-xs font-bold shrink-0">
            PA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-gray-900 truncate">Platform Admin</p>
            <p className="text-[10px] text-gray-400 truncate">admin@lexmanage.com</p>
          </div>
          <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors shrink-0">
            <Settings className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
        <div className="border-t border-gray-100 flex items-center justify-between px-4 py-3">
          <Link href="/login" className="flex items-center gap-2 text-[#0e2340] hover:opacity-75 transition-opacity">
            <LogOut className="w-4 h-4" />
            <span className="text-[13px] font-semibold">Sign Out</span>
          </Link>
          <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-400 rotate-180" />
          </button>
        </div>
      </div>
    </aside>
  );
}
