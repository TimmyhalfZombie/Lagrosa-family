"use server";

import fs from "fs";
import path from "path";

export async function getGalleryImages() {
    const galleryDir = path.join(process.cwd(), "public", "gallery");

    try {
        if (!fs.existsSync(galleryDir)) {
            return [];
        }

        const files = fs.readdirSync(galleryDir);
        const images = files
            .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map((file) => `/gallery/${file}`);

        return images;
    } catch (error) {
        console.error("Error reading gallery directory:", error);
        return [];
    }
}
