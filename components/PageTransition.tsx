"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || animatingRef.current) return;
    animatingRef.current = true;

    // Use microtask to ensure React has committed all children to DOM
    Promise.resolve().then(() => {
      const cards = el.querySelectorAll<HTMLElement>(".magic-bento-card");
      if (!cards.length) return;

      // Reset all cards to initial state
      gsap.set(cards, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.4 },
        onComplete: () => { animatingRef.current = false; },
      });

      tl.to(cards, { opacity: 1, y: 0, stagger: 0.04 });
    });
  }, []);

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {children}
    </div>
  );
}
