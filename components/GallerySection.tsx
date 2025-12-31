"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getGalleryImages } from "@/app/actions/getGalleryImages";
import { X } from "lucide-react";

export default function GallerySection() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const fetchImages = async () => {
        try {
            const imgs = await getGalleryImages();
            setImages(imgs);
        } catch (err) {
            console.error("Failed to fetch images", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    if (loading) return null;
    if (images.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.heading}>
                    Moments in Time
                </h2>
                <p className={styles.subheading}>A collection of our cherished memories.</p>
            </div>

            <div className={styles.grid}>
                {images.map((src, index) => (
                    <motion.div
                        key={src}
                        layoutId={`image-${src}`}
                        onClick={() => setSelectedImage(src)}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.02 }} // Faster stagger
                        viewport={{ once: true }}
                        className={styles.imageCard}
                        style={{
                            rotate: `${[6, -4, 8, -3, 5, -7, 2, -5][index % 8]}deg`,
                            zIndex: 1
                        }}
                        whileHover={{
                            scale: 1.5,
                            rotate: 0,
                            zIndex: 50,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div className={styles.imageOverlay} />
                        <motion.img
                            src={src}
                            alt={`Gallery Image ${index + 1}`}
                            className={styles.image}
                        />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.lightbox}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className={styles.closeButton}
                        >
                            <X size={32} />
                        </motion.button>

                        <motion.img
                            layoutId={`image-${selectedImage}`}
                            src={selectedImage}
                            alt="Selected Memory"
                            className={styles.lightboxImage}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

const styles = {
    section: "w-full max-w-[98%] mx-auto py-20 px-2",
    header: "text-center mb-16",
    heading: "text-4xl md:text-5xl font-serif text-white/90 mb-4",
    subheading: "text-white/60 font-light tracking-wide",
    grid: "flex flex-wrap justify-center items-center gap-4 md:gap-8 pb-20 overflow-visible", // Tighter gap, center items
    imageCard: "relative bg-white p-2 pb-6 shadow-lg cursor-pointer will-change-transform transform-gpu", // Smaller frame padding
    imageOverlay: "absolute inset-0 bg-transparent transition-colors z-10",
    image: "w-[110px] h-[130px] md:w-[150px] md:h-[180px] object-cover bg-gray-200", // Much smaller images
    lightbox: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4",
    closeButton: "absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50",
    lightboxImage: "max-w-full max-h-[90dvh] object-contain rounded-sm shadow-2xl",
};
