import React from "react";
import { RotatingText } from "../components/RotatingText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScramblingText from "../components/ScramblingText";

gsap.registerPlugin(ScrollTrigger);

const Introduction = () => {
  useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".boxes",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });

  tl.to(".circular-ball", {
    scale: 5,
    y: 510,
    duration: 1,
    ease: "power1.out",
  })
  .to(".circular-ball", {
    scale: 500,
    duration: 2.3,
    ease: "power1.out",
  });
}, []);


  return (
    <main className="boxes relative flex h-screen w-full items-center justify-center overflow-hidden bg-white">
  {/* Container that limits the explosion overflow */}
  <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
    <div className="absolute top-0 left-[27%] w-4 h-4 bg-black rounded-full circular-ball" />
  </div>

  {/* Rotating Text */}
  <div className="absolute bottom-10 left-0 right-0 px-4 text-center z-30">
    <RotatingText text="I'm Saad" />
  </div>

  {/* Scrambling Text */}
  <div className="z-30 top-0 absolute">
    <ScramblingText
      texts={[
        'I am <Full‑Stack Dev>',
        'I am <Cross Platform App Dev>',
        'I am <3D Web Dev>',
        'I am <AI Powered Solutions Dev>',
        'I am <Tech Enthusiast>',
      ]}
      interval={2}
      scrambleConfig={{
        duration: 5,
        speed: 0.001,
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>',
      }}
    />
  </div>
</main>

  );
};

export default Introduction;
