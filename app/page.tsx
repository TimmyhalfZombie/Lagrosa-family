"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FireworksBackground from "@/components/FireworksBackground";
import HeroSection from "@/components/HeroSection";
import FamilyCard from "@/components/FamilyCard";
import Slideshow from "@/components/Slideshow";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const fireworksOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    // Content moves up normally, but starts below the viewport
    // No specific transform needed for Y if we use margin/padding
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

    return (
        <main ref={containerRef} className={styles.main}>
            {/* Background - Fixed behind everything */}
            <motion.div
                className={styles.background}
                style={{ opacity: fireworksOpacity }}
            >
                <FireworksBackground />
            </motion.div>

            {/* Hero Section - Fixed and stays in place w/ transforms */}
            <motion.div
                className={styles.heroFixed}
                style={{ opacity: heroOpacity, scale: heroScale }}
            >
                <HeroSection />
            </motion.div>

            {/* Scrolling Content - Starts after 100vh */}
            <div className={styles.scrollContentWrapper}>
                <div className={styles.contentContainer}>
                    <motion.div
                        style={{ opacity: contentOpacity }}
                        className={styles.contentMotion}
                    >
                        {/* Family Section */}
                        <div className={styles.familySection}>
                            <FamilyCard />
                        </div>

                        {/* Gallery Section - Switched to Slideshow for performance */}
                        <div className={styles.gallerySection}>
                            <Slideshow />
                        </div>
                    </motion.div>

                    <footer className={styles.footer}>
                        <p>&copy; 2026 Lagrosa Family. Made with ❤️.</p>
                    </footer>
                </div>
            </div>
        </main>
    );
}

const styles = {
    main: "relative min-h-screen bg-midnight",
    background: "fixed inset-0 z-0 pointer-events-auto",
    heroFixed: "fixed inset-0 z-0 flex items-center justify-center pointer-events-none", // Hero is behind content
    scrollContentWrapper: "relative z-10 w-full pt-[100vh] pointer-events-none", // Pushes content down
    contentContainer: "pointer-events-auto bg-gradient-to-b from-transparent via-midnight/80 to-midnight", // Gradient to blend
    contentMotion: "w-full flex flex-col items-center justify-center gap-20 pb-0",
    familySection: "w-full px-4 pt-20", // Added padding top to separate from hero if needed
    gallerySection: "w-full",
    footer: "py-8 text-center text-white/20 text-sm",
};
