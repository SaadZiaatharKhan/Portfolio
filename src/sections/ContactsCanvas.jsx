import { Html, Stars } from "@react-three/drei";
import React from "react";
import { Astronaut } from "../components/Astronaut";
import HolographicDevice from "../components/HolographicDevice";
import Github from "../../public/images/Contacts/Github.svg";
import Linkedin from "../../public/images/Contacts/LinkedIn.svg";
import Gmail from "../../public/images/Contacts/Gmail.svg";

const ContactsCanvas = () => {
  return (
    <>
      <Stars />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <group scale={0.8} position={[0, -2, 3]}>
        <Astronaut />
      </group>

      <group position={[-0.32, 0.3, 4]} scale={0.13}>
        <HolographicDevice />
      </group>

      <group position={[-0.48, 0, 4]} scale={0.3}>
        <Html>
          <div className="bg-white/30 backdrop-sepia-0 h-1/3 w-xs flex justify-center items-center flex-col m-2 p-1">
            <div className="text-2xl font-bold m-2 p-1">Reach Me At</div>

            <div className="flex contain-content m-3 p-2">
              <a href="https://github.com/SaadZiaatharKhan" target="_blank">
                <img src={Github} className="h-12 w-12 m-1 p-1" />
              </a>
              <a href="https://www.linkedin.com/in/saadziakhan" target="_blank">
                <img src={Linkedin} className="h-12 w-12 m-1 p-1" />
              </a>
              <a href="mailto:saadziaatharkhan@gmail.com" target="_blank">
                <img src={Gmail} className="h-12 w-12 m-1 p-1" />
              </a>
            </div>

            {/* Download CV Button */}
            <a
              href="/Saad_Developer_Resume.pdf" // Make sure this file exists in the public/ directory
              download
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Download CV
            </a>
          </div>
        </Html>
      </group>
    </>
  );
};

export default ContactsCanvas;
