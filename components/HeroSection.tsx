"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    const rotateX = useTransform(mouseY, [-500, 500], [10, -10]);
    const rotateY = useTransform(mouseX, [-500, 500], [-10, 10]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = ref.current?.getBoundingClientRect();
            if (rect) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                x.set(e.clientX - centerX);
                y.set(e.clientY - centerY);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    return (
        <section ref={ref} className={styles.section}>
            {/* 3D Tilt and Spotlight removed for clean text */}
            <div className={styles.tiltContainer}>

                <div className="relative flex flex-col items-center">
                    {/* Glow Backdrop removed */}

                    {/* Static Text - Visible Immediately */}
                    <h1 className={styles.greetingText}>
                        Happy New Year
                    </h1>

                    <h1 className={styles.yearText}>
                        2026
                    </h1>
                </div>

                <div className={styles.messageContainer}>
                    <div className={styles.messageContent}>

                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <span className={styles.scrollText}>Please Scroll</span>
            </div>
        </section>
    );
}

const styles = {
    section: "relative h-screen flex flex-col items-center justify-center z-10 text-center px-4 overflow-hidden",
    tiltContainer: "flex flex-col items-center justify-center",
    greetingText: "relative z-10 font-serif text-5xl md:text-8xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600 leading-none tracking-tight py-4 pr-4 text-center select-none",
    yearText: "font-serif text-6xl md:text-8xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-t from-white via-yellow-200 to-yellow-500 drop-shadow-2xl",
    messageContainer: "mt-12 px-4",
    messageContent: "text-blue-50 text-lg md:text-2xl font-light tracking-wide max-w-4xl mx-auto leading-relaxed space-y-2",
    blessingText: "text-yellow-200 font-serif italic text-xl md:text-3xl animate-pulse",
    scrollIndicator: "absolute bottom-10 animate-bounce",
    scrollText: "text-white/50 text-sm tracking-[0.5em] uppercase",
};
