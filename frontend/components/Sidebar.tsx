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
    <aside className="w-64 flex flex-col h-screen sticky top-0 bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-white/6">
      {/* Logo */}
      <div className="p-5 border-b border-gray-200 dark:border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-600 dark:bg-primary-700 flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-[#e2e8f0] leading-tight">
              Matter Intake
            </div>
            <div className="text-xs text-gray-500 dark:text-[#94a3b8]">
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
                  ? "bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300"
                  : "text-gray-600 dark:text-[#94a3b8] hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-[#e2e8f0]"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-white/6">
        <div className="text-xs text-gray-400 dark:text-[#64748b]">
          Perkins Coie · Demo
        </div>
      </div>
    </aside>
  );
}
