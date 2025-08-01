import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Register GSAP Draggable plugin
gsap.registerPlugin(Draggable);

/**
 * DraggableText Component
 *
 * Props:
 *  - text: string to display and animate
 *  - draggableConfig (optional): config object for Draggable.js
 *
 * Splits the text into characters that can be freely dragged within the container.
 * Uses dynamic import of 'split-type'.
 *
 * Installation:
 *   npm install split-type
 */
export default function DraggableText({ text, draggableConfig = {} }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let split;
    let draggableInstances = []; // Store instances for cleanup

    async function setup() {
      const container = containerRef.current;
      const textEl = textRef.current;

      // Guard against missing refs
      if (!container || !textEl) return;

      try {
        // Dynamically import SplitType
        const { default: SplitType } = await import('split-type');
        split = new SplitType(textEl, { types: 'chars' });
        const chars = Array.isArray(split.chars) ? split.chars : [];

        if (chars.length === 0) return;

        const { clientWidth } = container;
        const charWidth = clientWidth / chars.length;

        chars.forEach((char, i) => {
          // Position each character absolute within container
          gsap.set(char, {
            position: 'absolute',
            top: '50%',
            left: i * charWidth + charWidth / 2,
            xPercent: -50,
            yPercent: -50,
          });

          // Make each char draggable and store instance
          const instance = Draggable.create(char, {
            type: 'x,y',
            bounds: container,
            inertia: true,
            ...draggableConfig,
          })[0]; // Draggable.create returns an array

          draggableInstances.push(instance);
        });
      } catch (err) {
        console.error('DraggableText setup error:', err);
      }
    }

    setup();

    return () => {
      // Clean up draggable instances first
      draggableInstances.forEach(instance => {
        if (instance) instance.kill();
      });
      draggableInstances = [];

      // Then revert split
      if (split) {
        split.revert();
      }
    };
  }, [text, draggableConfig]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ userSelect: 'none' }}
    >
      <div
        ref={textRef}
        className="text-3xl md:text-6xl font-extrabold text-white whitespace-nowrap"
      >
        {text}
      </div>
    </div>
  );
}