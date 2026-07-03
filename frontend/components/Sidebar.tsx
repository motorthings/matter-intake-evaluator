"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  History,
  Settings,
  Scale,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Evaluate", icon: FileText },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex flex-col h-screen sticky top-0 bg-[#111820] border-r border-white/6">
      {/* Logo */}
      <div className="p-5 border-b border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Scale className="w-5 h-5 text-[#0a0e14]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#e4e8ef] leading-tight">
              Matter Intake
            </div>
            <div className="text-xs text-[#8c9aad]">
              Evaluation Platform
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-950/40 text-primary-300 border border-primary-500/20"
                  : "text-[#8c9aad] hover:bg-white/5 hover:text-[#e4e8ef]"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/6">
        <div className="text-xs text-[#55667a]">
          Ashurst Perkins Coie &mdash; Demo
        </div>
      </div>
    </aside>
  );
}
