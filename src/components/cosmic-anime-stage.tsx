"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, createTimeline, stagger, utils } from "animejs";

const PARTICLES = Array.from({ length: 34 }, (_, index) => {
  const left = (index * 37 + 11) % 100;
  const top = (index * 53 + 17) % 100;
  const size = 4 + ((index * 7) % 12);
  const palette = ["particle-cyan", "particle-pink", "particle-green", "particle-yellow"];

  return {
    id: index,
    left,
    top,
    size,
    color: palette[index % palette.length],
    shape: index % 3 === 0 ? "particle-diamond" : "particle-square"
  };
});

export function CosmicAnimeStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".cosmic-shell");
    const stage = stageRef.current;

    if (!shell || !stage) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    shell.classList.add("anime-ready");

    if (reduceMotion) {
      return () => shell.classList.remove("anime-ready");
    }

    let cursorTween: ReturnType<typeof animate> | null = null;
    const cursor = stage.querySelector<HTMLElement>(".cursor-crosshair");
    const pointer = {
      x: window.innerWidth * 0.72,
      y: window.innerHeight * 0.24
    };

    const paintCursor = () => {
      if (!cursor) {
        return;
      }

      cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
    };

    paintCursor();

    const scope = createScope({ root: shell }).add(() => {
      createTimeline({
        defaults: {
          duration: 850,
          ease: "outExpo"
        }
      })
        .add(
          ".speech-bubble",
          { y: [34, 0], opacity: [0, 1], rotate: [-8, -2], scale: [0.82, 1] },
          120
        )
        .add(
          ".avatar-orbit",
          {
            opacity: [0, 1],
            rotate: [-34, 0],
            scale: [0.34, 1],
            duration: 1050,
            ease: "outElastic(1, .72)"
          },
          260
        )
        .add(
          ".cosmic-hero h1",
          { y: [42, 0], opacity: [0, 1], scale: [0.92, 1] },
          430
        )
        .add(".tagline-chip", { y: [28, 0], opacity: [0, 1] }, 560)
        .add(".meta-pill", { y: [22, 0], opacity: [0, 1], delay: stagger(70) }, 660)
        .add(".featured-panel", { y: [42, 0], opacity: [0, 1], scale: [0.94, 1] }, 790)
        .add(
          ".orbit-link-card",
          { y: [34, 0], opacity: [0, 1], delay: stagger(74, { from: "center" }) },
          920
        )
        .add(".status-panel", { y: [36, 0], opacity: [0, 1], rotate: [-2, 1] }, 1180);

      animate(".cosmic-particle", {
        x: () => utils.random(-160, 160),
        y: () => utils.random(-130, 130),
        rotate: () => utils.random(-180, 180),
        opacity: [0.18, 0.92],
        scale: () => [0.35, utils.random(0.8, 1.85, 2)],
        duration: () => utils.random(5200, 9800),
        delay: stagger(130, { from: "random", seed: 19 }),
        alternate: true,
        loop: true,
        ease: "inOutSine"
      });

      animate(".orbit-line-large", {
        rotate: 360,
        duration: 36000,
        loop: true,
        ease: "linear"
      });

      animate(".orbit-line-small", {
        rotate: -360,
        duration: 24000,
        loop: true,
        ease: "linear"
      });

      animate(".decor-star", {
        y: () => utils.random(-28, 18),
        rotate: () => utils.random(-24, 24),
        scale: [0.9, 1.18],
        duration: () => utils.random(2400, 4200),
        delay: stagger(220),
        alternate: true,
        loop: true,
        ease: "inOutSine"
      });

      animate(".decor-planet", {
        y: [-14, 20],
        rotate: [-8, 10],
        duration: 5400,
        delay: stagger(420),
        alternate: true,
        loop: true,
        ease: "inOutSine"
      });

      animate(".decor-rocket", {
        x: [0, 118, -22, 0],
        y: [0, -96, 36, 0],
        rotate: [44, 62, 32, 44],
        duration: 15500,
        loop: true,
        ease: "inOutSine"
      });

      animate(".avatar-star", {
        rotate: [12, 28],
        scale: [1, 1.24],
        duration: 1250,
        alternate: true,
        loop: true,
        ease: "inOutQuad"
      });

      animate(".avatar-image", {
        boxShadow: [
          "0 0 0px rgba(0, 245, 212, 0)",
          "0 0 42px rgba(0, 245, 212, .62)"
        ],
        duration: 2200,
        alternate: true,
        loop: true,
        ease: "inOutSine"
      });

      animate(".featured-link", {
        scale: [1, 1.012],
        duration: 2200,
        alternate: true,
        loop: true,
        ease: "inOutSine"
      });

      animate(".status-lights span", {
        scale: [0.75, 1.2],
        opacity: [0.55, 1],
        duration: 780,
        delay: stagger(160),
        alternate: true,
        loop: true,
        ease: "inOutQuad"
      });

      const onPointerMove = (event: PointerEvent) => {
        cursorTween?.cancel();
        cursorTween = animate(pointer, {
          x: event.clientX,
          y: event.clientY,
          duration: 620,
          ease: "outExpo",
          onRender: paintCursor
        });
      };

      const burstPalette = ["#00f5d4", "#ff007f", "#39ff14", "#fee440", "#9d4edd"];

      const createBurst = (event: PointerEvent) => {
        const sparks = Array.from({ length: 12 }, (_, sparkIndex) => {
          const spark = document.createElement("span");
          spark.className = "spark-burst";
          spark.style.left = `${event.clientX}px`;
          spark.style.top = `${event.clientY}px`;
          spark.style.backgroundColor = burstPalette[sparkIndex % burstPalette.length];
          stage.appendChild(spark);
          return spark;
        });

        animate(sparks, {
          x: (_spark: unknown, sparkIndex = 0) => {
            const angle = (Math.PI * 2 * sparkIndex) / sparks.length;
            return Math.cos(angle) * utils.random(34, 82);
          },
          y: (_spark: unknown, sparkIndex = 0) => {
            const angle = (Math.PI * 2 * sparkIndex) / sparks.length;
            return Math.sin(angle) * utils.random(34, 82);
          },
          rotate: () => utils.random(-220, 220),
          scale: [0, 1, 0.15],
          opacity: [1, 0],
          duration: 820,
          delay: stagger(18),
          ease: "outExpo",
          onComplete: () => sparks.forEach((spark) => spark.remove())
        });
      };

      const burstTargets = shell.querySelectorAll<HTMLElement>(
        ".orbit-link-card, .featured-link"
      );

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      burstTargets.forEach((target) => target.addEventListener("pointerenter", createBurst));

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        burstTargets.forEach((target) => target.removeEventListener("pointerenter", createBurst));
        cursorTween?.cancel();
        stage.querySelectorAll(".spark-burst").forEach((spark) => spark.remove());
      };
    });

    return () => {
      scope.revert();
      shell.classList.remove("anime-ready");
    };
  }, []);

  return (
    <div className="anime-stage" ref={stageRef} aria-hidden="true">
      <span className="cursor-crosshair" />
      {PARTICLES.map((particle) => (
        <span
          className={`cosmic-particle ${particle.color} ${particle.shape}`}
          key={particle.id}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
        />
      ))}
    </div>
  );
}
