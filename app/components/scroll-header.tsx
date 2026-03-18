"use client";
import { useEffect } from "react";

export function ScrollHeader() {
  useEffect(() => {
    const header = document.querySelector(".glass-header");
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
