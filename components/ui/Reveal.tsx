"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 16,
  duration = 600,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Server / very old browsers: reveal immediately, no state churn.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal--in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--in");
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn("reveal", className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ["--reveal-y" as string]: `${y}px`,
      }}
    >
      {children}
    </Tag>
  );
}