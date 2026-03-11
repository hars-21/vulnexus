'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    section: 'MAIN',
    items: [
      { label: 'Home', href: '/', icon: '⌂' },
      { label: 'CVE Database', href: '/cve', icon: '⊞' },
      { label: 'Exploit Library', href: '/search', icon: '▤' },
      { label: 'Threat Feed', href: '/threat-feed', icon: '⚡' },
    ]
  },
  {
    section: 'INTELLIGENCE',
    items: [
      { label: 'Attack Path', href: '/attack-path', icon: '⟲' },
      { label: 'Vulnerability Predictor', href: '/vulnerability-predictor', icon: '◉' },
      { label: 'Pentester Assistant', href: '/chat', icon: '◧' },
    ]
  },
  {
    section: 'COMMUNITY',
    items: [
      { label: 'Recent Changes', href: '#', icon: '↺' },
      { label: 'Contributors', href: '#', icon: '⊕' },
      { label: 'Submit POC', href: '/poc', icon: '⬆' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-gray-200 bg-white p-6 space-y-8">
      <nav className="space-y-6">
        {navItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-3">
              {section.section}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                        isActive
                          ? 'bg-black text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-xs font-bold mb-2">PRO ACCESS</p>
          <p className="text-xs text-gray-500 mb-3">Get real-time alerts and advanced exploit APIs.</p>
          <button className="w-full bg-black text-white text-[11px] font-bold py-2 rounded hover:bg-gray-800 transition-colors">
            UPGRADE
          </button>
        </div>
      </div>
    </aside>
  );
}
