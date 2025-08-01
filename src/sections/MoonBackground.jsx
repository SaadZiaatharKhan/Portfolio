import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DraggableText from "../components/DraggableText";

const MoonBackground = () => {
  useGSAP(() => {
    gsap.set(".background-image", { marginTop: "-100vh", opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".container1",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })
      .to(".mask0", { scale: 7, opacity: 0, duration: 1, ease: "power1.out" })
      .to(".background-image", { opacity: 1 })
  });

  return (
    <main className="container1 w-full overflow-hidden">
      <div className="flex h-screen w-full justify-center items-center mask0 z-10 bg-amber-50 mix-blend-screen">
        <h1 className="text-4xl md:text-7xl text-black font-extrabold">
          WELCOME
        </h1>
      </div>
      <div className="background-image relative h-screen w-full overflow-hidden">
  <img
    src="/images/moon-background.webp"
    className="absolute inset-0 w-full h-full object-cover"
    alt="Moon background"
  />

  {/* Remove the <h2> wrapper */}
  <div className="absolute inset-0 z-10 flex justify-center items-center">
    <DraggableText
      text="Hi There"
      // you can override the container size if needed:
    />
  </div>
</div>

    </main>
  );
};

export default MoonBackground;
