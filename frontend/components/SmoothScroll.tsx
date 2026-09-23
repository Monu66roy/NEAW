"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 0.5,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}