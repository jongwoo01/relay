"use client";

import { useEffect } from "react";

export function ScrollHeader() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".glass-header");
    if (!header) return;

    const root = document.documentElement;

    const updateHeaderHeight = () => {
      root.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    };

    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    updateHeaderHeight();
    onScroll();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.style.setProperty("--header-height", "0px");
    };
  }, []);

  return null;
}
