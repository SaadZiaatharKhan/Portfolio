import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

// Register GSAP TextPlugin
gsap.registerPlugin(TextPlugin);

/**
 * ScramblingText Component
 *
 * Props:
 *  - texts: array of strings to cycle through
 *  - interval: seconds to wait before next scramble/pause
 *  - scrambleConfig: optional config { chars: string, speed: number, duration: number }
 *
 * Example usage:
 * <ScramblingText
 *   texts={[
 *     'I am <Web Developer>',
 *     'I am <App Developer>',
 *     'I am <UI/UX Designer>'
 *   ]}
 *   interval={2}
 *   scrambleConfig={{ chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>', speed: 0.3, duration: 1 }}
 * />
 */
export default function ScramblingText({ texts = [], interval = 2, scrambleConfig = {} }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current || texts.length === 0) return;

    // Set initial text without scramble
    textRef.current.textContent = texts[0];

    // Build timeline: scramble each text, then pause
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    texts.forEach((str) => {
      // Tween scramble to new string
      tl.to(textRef.current, {
        duration: scrambleConfig.duration || 1,
        scrambleText: {
          text: str,
          chars: scrambleConfig.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>',
          speed: scrambleConfig.speed || 0.3
        },
        ease: 'none'
      });
      // Pause on final text
      tl.to({}, { duration: interval });
    });

    return () => {
      tl.kill();
    };
  }, [texts, interval, scrambleConfig]);

  return (
    <div className="bg-gray-500 text-white p-4 text-center rounded">
      <span
        ref={textRef}
        className="text-xl md:text-5xl font-semibold whitespace-nowrap"
      />
    </div>
  );
}
