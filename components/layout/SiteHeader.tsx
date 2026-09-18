"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-[14px] font-medium transition-colors",
                  active
                    ? "text-primary-700"
                    : "text-secondary hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contacto"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-700 px-4 text-[14px] font-medium text-primary-200 transition-colors hover:bg-primary-800"
          >
            Hablar con el equipo
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-surface md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-3 text-[15px] font-medium",
                    active
                      ? "bg-primary-200 text-primary-800"
                      : "text-secondary hover:bg-canvas",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary-700 px-4 text-[14px] font-medium text-primary-200"
            >
              Hablar con el equipo
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}