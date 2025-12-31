import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel, Great_Vibes } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });

export const metadata: Metadata = {
    metadataBase: new URL("https://lagrosafamily.onrender.com/"), // Update this with your actual Render URL!
    title: "Lagrosa Family",
    description: "sent you a special surprise message 💌. Open it",
    openGraph: {
        title: "Lagrosa Family sent you a special surprise message 💌. Open it",
        description: "Happy New Year 2026! Tap to view your surprise.",
        images: ["/opengraph-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(inter.variable, playfair.variable, cinzel.variable, greatVibes.variable, "font-sans antialiased")}>
                {children}
            </body>
        </html>
    );
}
