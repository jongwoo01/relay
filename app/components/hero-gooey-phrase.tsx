"use client";

import * as React from "react";

type GooeyPhraseItem = {
  id: string;
  content: React.ReactNode;
};

type HeroGooeyPhraseProps = {
  items: GooeyPhraseItem[];
  sizer?: React.ReactNode;
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  phraseClassName?: string;
};

export function HeroGooeyPhrase({
  items,
  sizer,
  morphTime = 1,
  cooldownTime = 1.8,
  className,
  phraseClassName,
}: HeroGooeyPhraseProps) {
  const reactId = React.useId();
  const filterId = React.useMemo(
    () => `hero-gooey-${reactId.replace(/[:]/g, "")}`,
    [reactId],
  );
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const frameRef = React.useRef<number | null>(null);
  const pairRef = React.useRef({
    current: 0,
    next: items.length > 1 ? 1 : 0,
  });
  const isMorphingRef = React.useRef(false);
  const [pair, setPair] = React.useState({
    current: 0,
    next: items.length > 1 ? 1 : 0,
  });
  const [isMorphing, setIsMorphing] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  React.useEffect(() => {
    pairRef.current = {
      current: 0,
      next: items.length > 1 ? 1 : 0,
    };
    isMorphingRef.current = false;
    setPair(pairRef.current);
    setIsMorphing(false);
  }, [items]);

  React.useEffect(() => {
    if (items.length < 2 || prefersReducedMotion) {
      return;
    }

    let lastTime = performance.now();
    let morph = 0;
    let cooldown = cooldownTime;

    const updateMorphing = (value: boolean) => {
      if (isMorphingRef.current !== value) {
        isMorphingRef.current = value;
        setIsMorphing(value);
      }
    };

    const setOpacityAndBlur = (fraction: number) => {
      const currentEl = text1Ref.current;
      const nextEl = text2Ref.current;

      if (!currentEl || !nextEl) {
        return;
      }

      const incoming = Math.max(fraction, 0.0001);
      const outgoing = Math.max(1 - fraction, 0.0001);
      const maxBlur = 18;

      nextEl.style.filter = `blur(${Math.min(8 / incoming - 8, maxBlur)}px)`;
      nextEl.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      currentEl.style.filter = `blur(${Math.min(8 / outgoing - 8, maxBlur)}px)`;
      currentEl.style.opacity = `${Math.pow(1 - fraction, 0.4) * 100}%`;
    };

    const showCurrentPhrase = () => {
      const currentEl = text1Ref.current;
      const nextEl = text2Ref.current;

      if (!currentEl || !nextEl) {
        return;
      }

      currentEl.style.filter = "";
      currentEl.style.opacity = "100%";
      nextEl.style.filter = "";
      nextEl.style.opacity = "0%";
    };

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (cooldown > 0) {
        cooldown -= dt;
        updateMorphing(false);
        showCurrentPhrase();
      } else {
        updateMorphing(true);
        morph += dt;
        const fraction = Math.min(morph / morphTime, 1);

        setOpacityAndBlur(fraction);

        if (fraction >= 1) {
          const nextCurrent = pairRef.current.next;
          const nextIndex = (nextCurrent + 1) % items.length;
          pairRef.current = { current: nextCurrent, next: nextIndex };
          setPair(pairRef.current);

          morph = 0;
          cooldown = cooldownTime;
          updateMorphing(false);
        }
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [cooldownTime, items, morphTime, prefersReducedMotion]);

  if (items.length === 0) {
    return null;
  }

  const currentItem = items[pair.current] ?? items[0];
  const nextItem = items[pair.next] ?? items[0];
  const sizeReference = sizer ?? items[0].content;
  const rootClassName = className ? ` ${className}` : "";
  const cleanLayerClasses = phraseClassName
    ? `select-none overflow-visible [grid-area:1/1] ${phraseClassName}`
    : "select-none overflow-visible [grid-area:1/1]";
  const phraseClasses = phraseClassName
    ? `select-none overflow-visible [grid-area:1/1] ${phraseClassName}`
    : "select-none overflow-visible [grid-area:1/1]";

  if (prefersReducedMotion || items.length === 1) {
    return <span className={`overflow-visible ${className ?? ""}`}>{items[0].content}</span>;
  }

  return (
    <span className={`relative inline-grid align-baseline overflow-visible${rootClassName}`}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -118"
            />
          </filter>
        </defs>
      </svg>

      <span aria-hidden="true" className={`invisible ${phraseClassName ?? ""}`}>
        {sizeReference}
      </span>

      <span
        className={cleanLayerClasses}
        style={{ opacity: isMorphing ? 0 : 1 }}
      >
        {currentItem.content}
      </span>

      <span
        className="inline-grid overflow-visible [grid-area:1/1]"
        style={{
          filter: isMorphing ? `url(#${filterId})` : "none",
          opacity: isMorphing ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <span ref={text1Ref} className={phraseClasses}>
          {currentItem.content}
        </span>
        <span ref={text2Ref} className={phraseClasses}>
          {nextItem.content}
        </span>
      </span>
    </span>
  );
}
