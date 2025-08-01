import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {
  const imgRef = useRef();

  useEffect(() => {
    // Glowing animation loop
    gsap.to(imgRef.current, {
      boxShadow: "0px 0px 30px red",
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      repeatRefresh: true,
      onRepeat: () => {
        // Change to a random HSL color on every repeat
        const hue = Math.floor(Math.random() * 360);
        const color = `hsl(${hue}, 100%, 60%)`;
        gsap.set(imgRef.current, {
          boxShadow: `0px 0px 30px ${color}`,
        });
      },
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        ref={imgRef}
        src={'/public/images/welcome.png'}
        alt="loader"
        style={{
          width: "150px",
          height: "150px",
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  );
};

export default Loader;
