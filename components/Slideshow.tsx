"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const GALLERY_IMAGES = [
    "/gallery/4.png", "/gallery/5.png", "/gallery/6.png", "/gallery/7.png", "/gallery/8.png",
    "/gallery/9.png", "/gallery/10.png", "/gallery/11.png", "/gallery/12.png", "/gallery/13.png",
    "/gallery/14.png", "/gallery/15.png", "/gallery/16.png", "/gallery/17.png", "/gallery/18.png",
    "/gallery/19.png", "/gallery/20.png", "/gallery/21.png", "/gallery/22.png"
];

export default function Slideshow() {
    const [images] = useState<string[]>(GALLERY_IMAGES);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            zIndex: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [images]);

    const nextSlide = () => {
        setDirection(1);
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };


    return (
        <section className="w-full max-w-5xl mx-auto py-20 px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#C0A040] mb-4 drop-shadow-md">
                    Moments in Time
                </h2>
                <p className="text-[#FDF5C9]/80 font-[family-name:var(--font-cinzel)] text-sm md:text-lg tracking-widest uppercase">
                    A collection of our cherished memories
                </p>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm group">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 flex items-center justify-center p-4 bg-black/20"
                    >
                        <img
                            src={images[current]}
                            alt={`Slide ${current + 1}`}
                            className="w-full h-full object-contain drop-shadow-2xl cursor-pointer"
                            onClick={() => setSelectedImage(images[current])}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all z-10"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all z-10"
                >
                    <ChevronRight size={32} />
                </button>

            </div>

            {/* Indicators Moved Below */}
            <div className="flex justify-center mt-6 gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > current ? 1 : -1);
                            setCurrent(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>

            <div className="text-center mt-[100px] px-4">
                <p className="font-[family-name:var(--font-cinzel)] text-white/90 text-sm md:text-lg italic tracking-wide max-w-3xl mx-auto">
                    "For we live by faith, not by sight."
                </p>
                <p className="font-[family-name:var(--font-cinzel)] text-white/50 text-xs md:text-sm mt-2 uppercase tracking-widest">
                    2 Corinthians 5:7
                </p>
            </div>

            {/* Full Screen Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Full view"
                            className="max-w-full max-h-full object-contain select-none"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
