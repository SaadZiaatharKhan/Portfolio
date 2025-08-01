import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * RotatingText Component
 * 
 * Props:
 *  - text: string to display
 *  - maxSize (optional): Tailwind text size classes (responsive)
 *  - rotateConfig (optional): GSAP config for rotation on hover
 *
 * Splits the text into individual characters that rotate on hover with yoyo effect.
 * Uses dynamic import of 'split-type'.
 *
 * Installation:
 *   npm install split-type
 */
export function RotatingText({
  text,
  maxSize = 'text-6xl md:text-9xl lg:text-[10rem]',
  rotateConfig = {}
}) {
  const textRef = useRef(null);

  useEffect(() => {
    let split;
    async function setup() {
      const { default: SplitType } = await import('split-type');
      split = new SplitType(textRef.current, { types: 'chars' });
      const chars = split.chars;

      // Prepare each char for hovering
      chars.forEach(char => {
        char.style.display = 'inline-block';
        gsap.set(char, { transformOrigin: '50% 50%' });

        const onEnter = () => {
          gsap.to(char, {
            rotation: 360,
            duration: 0.8,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
            ...rotateConfig
          });
        };
        char.addEventListener('mouseenter', onEnter);
        // Store listener for cleanup
        char._onEnter = onEnter;
      });
    }

    setup();

    return () => {
      if (split) {
        split.chars.forEach(char => {
          if (char._onEnter) {
            char.removeEventListener('mouseenter', char._onEnter);
          }
        });
        split.revert();
        gsap.killTweensOf(split.chars);
      }
    };
  }, [text, rotateConfig]);

  return (
    <div className={maxSize + ' font-extrabold'}>
      <span ref={textRef} className="whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}
