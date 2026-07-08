"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Command, Search } from "lucide-react";
import { dashboardNavigation } from "@/lib/constants/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 px-0.5 shrink-0 flex-col bg-[#0e0e12] text-neutral-100">
      {/* Brand */}
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-3 pt-6 pb-5"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-linear-to-b from-amber-400 to-amber-700 text-amber-950">
          <Command className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <span className="font-serif text-lg italic tracking-tight">
          ClickDown
        </span>
      </Link>

      {/* Search */}
      <div className="px-3 pb-4">
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-white/[0.07] hover:text-neutral-200"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Search</span>
          <kbd className="ml-auto rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {dashboardNavigation.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-white/[0.08] font-medium text-neutral-100"
                  : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
              }`}
            >
              {item.icon && (
                <item.icon
                  className="h-4.5 w-4.5 shrink-0"
                  aria-hidden="true"
                />
              )}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer: user + logout */}
      <div className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold">
          N
        </span>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-medium">Your name</span>
          <span className="truncate text-xs text-neutral-500">
            you@email.com
          </span>
        </div>
        <button
          type="button"
          aria-label="Log out"
          className="ml-auto rounded-lg p-2 text-neutral-500 transition-colors hover:bg-red-950/40 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
