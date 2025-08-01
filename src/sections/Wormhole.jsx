import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react"

const Wormhole = () => {
    const videoRef = useRef(null);

    useGSAP(() => {
        gsap.set('.first-vd-wrapper', {
            marginTop: '-20vh', opacity: 0
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.first-vd-wrapper',
                start: 'top top',
                end: '+=200% top',
                scrub: true,
                pin: true
            }
        })

        tl.to('.canvas', {
                delay: 0.5, opacity:0, ease: 'power1.inOut'
            });
        tl.to('.first-vd-wrapper', {
            opacity: 1, duration: 2, ease: 'power1.inOut'
        }, []);

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {currentTime: videoRef.current.duration, duration: 3, ease: 'power1.inOut'}, '<')
        }
            

    }, []);

    return (
    <section className="first-vd-wrapper size-full">
        <div className="w-full h-svh">
            <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                src="/videos/Wormhole.mp4"
                className="first-vd object-cover w-full h-full"
            />
        </div>
    </section>
  )
}

export default Wormhole
