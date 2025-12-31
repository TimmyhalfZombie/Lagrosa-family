"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
}

export default function FireworksBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let fireworks: { x: number; y: number; targetY: number; color: string; trail: Particle[] }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const colors = ["#FFD700", "#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#00FFFF", "#FFFFFF"];

        const createExplosion = (x: number, y: number, color: string) => {
            const particleCount = 100;
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = Math.random() * 8 + 5; // Much faster burst
                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    alpha: 1,
                    color,
                });
            }
        };

        const handleClick = (e: MouseEvent) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            createExplosion(e.clientX, e.clientY, color);
        };

        canvas.addEventListener("mousedown", handleClick);
        // Also support touch for mobile
        canvas.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            const color = colors[Math.floor(Math.random() * colors.length)];
            createExplosion(touch.clientX, touch.clientY, color);
        });

        const animate = () => {
            ctx.fillStyle = "rgba(2, 6, 23, 0.2)"; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Launch fireworks randomly - Reduced probability slightly to let user clicks shine
            if (Math.random() < 0.02) {
                fireworks.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height,
                    targetY: Math.random() * (canvas.height / 2),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    trail: [],
                });
            }

            // Update fireworks
            for (let i = fireworks.length - 1; i >= 0; i--) {
                const fw = fireworks[i];
                fw.y -= 15; // Velocity up significantly for responsiveness

                // Add trail
                fw.trail.push({ x: fw.x, y: fw.y, vx: 0, vy: 0, alpha: 1, color: fw.color });

                if (fw.y <= fw.targetY) {
                    createExplosion(fw.x, fw.y, fw.color);
                    fireworks.splice(i, 1);
                }
            }

            // Update particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05; // Gravity
                p.alpha -= 0.02;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousedown", handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 cursor-default"
        />
    );
}
