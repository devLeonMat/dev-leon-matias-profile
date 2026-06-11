import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * Triggers an anime.js v4 animation when the container enters the viewport.
 * Queries [data-anime] children and passes them to the animationFactory.
 */
export function useAnimeOnScroll(
  animationFactory: (targets: Element[]) => void,
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !played.current) {
        played.current = true;
        const targets = Array.from(el.querySelectorAll("[data-anime]"));
        if (targets.length) animationFactory(targets);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Stagger fade-in slide from left — convenience wrapper. */
export function useStaggerSlide(direction: "left" | "right" | "up" = "left") {
  return useAnimeOnScroll((targets) => {
    const x = direction === "left" ? [-32, 0] : direction === "right" ? [32, 0] : [0, 0];
    const y = direction === "up" ? [24, 0] : [0, 0];
    animate(targets as HTMLElement[], {
      translateX: x,
      translateY: y,
      opacity: [0, 1],
      duration: 600,
      delay: stagger(120),
      ease: "outCubic",
    });
  });
}

/** Counter animation from 0 to a numeric value. */
export function useCountUp(targetValue: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !played.current) {
        played.current = true;
        const obj = { val: 0 };
        animate(obj, {
          val: targetValue,
          duration,
          ease: "outExpo",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.round(obj.val).toString();
          },
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetValue, duration]);

  return ref;
}
