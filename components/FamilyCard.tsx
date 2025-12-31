"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

export default function FamilyCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Reduced rotation range for a larger card to prevent excessive distortion
    const rotateX = useSpring(useTransform(y, [-500, 500], [5, -5]), { mass: 0.5, stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-500, 500], [-5, 5]), { mass: 0.5, stiffness: 200, damping: 20 });

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            className={styles.cardContainer}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d", // Ensure children are 3D
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.innerCard}>

                {/* Heading Moved Top */}
                <h2 className={styles.heading}>
                    From our Family to Yours
                </h2>

                {/* Photo Area - Larger */}
                <div
                    className={styles.photoArea}
                    style={{ transform: "translateZ(60px)" }}
                >
                    <img
                        src="/images/family.png"
                        alt="Our Family"
                        className={styles.photoImg}
                    />
                </div>

                {/* Text Area */}
                <div className={styles.textArea}>
                    <div className={styles.textContent}>
                        <p className="font-medium">
                            "May the Lord bless you and keep you in this New Year. May He fill your home with His abundant grace, anchor your heart in His peace, and let every moment be a testimony to His unfailing love.
                        </p>
                        <p className={styles.quote}>
                            "May the Lord bless you and keep you..."
                        </p>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}

const styles = {
    cardContainer: "relative w-[95%] md:w-full max-w-5xl mx-auto h-[82dvh] md:h-[90vh] rounded-2xl cursor-pointer will-change-transform my-auto",
    innerCard: "absolute inset-0 bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-2xl rounded-2xl px-5 pb-5 pt-12 flex flex-col items-center gap-6 overflow-hidden border-4 border-[#FDF5C9]/50",
    photoArea: "w-full flex-grow relative group rounded-xl overflow-hidden",
    photoImg: "w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl",
    textArea: "w-full shrink-0 text-center space-y-3 pb-4 pt-2",
    heading: "text-2xl md:text-5xl font-[family-name:var(--font-great-vibes)] text-[#2C1810] font-normal text-center tracking-wide mb-4 whitespace-normal md:whitespace-nowrap",
    textContent: "space-y-2 text-[#4A3728] text-sm md:text-xl font-[family-name:var(--font-cinzel)] leading-relaxed max-w-3xl mx-auto tracking-wide",
    quote: "font-[family-name:var(--font-cinzel)] italic text-[#5D4037] text-base md:text-xl mt-2 font-bold",
};
