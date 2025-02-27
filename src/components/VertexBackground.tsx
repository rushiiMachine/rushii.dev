import { JSX, onCleanup, onMount } from "solid-js";
import { ClassProps } from "./ClassProps";

// This was initially based on Vitox's particle library from LiquidBounce, ported to web:
// https://github.com/CCBlueX/LiquidBounce/tree/legacy/src/main/java/net/vitox

function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

interface Particle {
    x: number;
    y: number;
    angle: number;
    speed: number;
    size: number;
}

function draw(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    mouseX?: number,
    mouseY?: number,
) {
    function drawParticle(p: Particle, isMouse?: boolean) {
        let connectingLines = 0;

        // // Draw vertex
        // ctx.beginPath();
        // ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        // ctx.fillStyle = "white";
        // ctx.fill();

        // Connect vertices
        for (const p2 of particles) {
            // Cheap way to avoid drawing the same line twice (one originating from each particle)
            if (p.x > p2.x && !isMouse) continue;

            const distance = Math.hypot(p2.x - p.x, p2.y - p.y);
            // TODO: allow configuring max distance
            if (!distance || distance > 250) continue;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1.3;
            ctx.stroke();
            connectingLines++;
        }

        // Move particle
        const nearParticlesBoost = connectingLines * 0.2 + 1;
        p.x += p.speed * Math.sin(p.angle) * nearParticlesBoost;
        p.y += p.speed * Math.cos(p.angle) * nearParticlesBoost;

        if (p.y > canvas.height)
            p.y = 1;
        if (p.x > canvas.width)
            p.x = 1;
        if (p.x < 1)
            p.x = canvas.width;
        if (p.y < 1)
            p.y = canvas.height;
    }

    ctx.reset();
    for (const p1 of particles) {
        drawParticle(p1);
    }
    if (mouseX || mouseY) {
        drawParticle({ x: mouseX, y: mouseY, angle: 0, speed: 0, size: 0, }, true)
    }
}

function initDraw(
    particleCount: number,
    enableMouse: boolean,
    canvas: HTMLCanvasElement,
) {
    const ctx = canvas.getContext("2d");
    const particles: Particle[] = new Array(particleCount);
    let canvasMouseX: number, canvasMouseY: number;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles[i] = {
            x: randomInRange(0, canvas.width),
            y: randomInRange(0, canvas.height),
            angle: randomInRange(0, 365),
            speed: randomInRange(0.1, 0.15),
            size: 0.5 + Math.random() * 1.3,
        };
    }

    const resizeListener = (_e: UIEvent) => {
        canvas.width = window.visualViewport.width;
        canvas.height = window.visualViewport.height;
    }
    window.addEventListener("resize", resizeListener);

    const mouseListener = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        canvasMouseX = (e.clientX - rect.x) * scaleX;
        canvasMouseY = (e.clientY - rect.y) * scaleY;
    };
    if (enableMouse) {
        window.addEventListener("mousemove", mouseListener);
    }

    let frameId: number;
    const drawWrap = (_time: DOMHighResTimeStamp) => {
        setTimeout(() => {
            frameId = requestAnimationFrame(drawWrap);
        }, 6);
        draw(canvas, ctx, particles, canvasMouseX, canvasMouseY);
    }
    frameId = requestAnimationFrame(drawWrap);

    onCleanup(() => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("mousemove", mouseListener);
        window.removeEventListener("resize", resizeListener);
    });
}

interface BackgroundProps extends ClassProps {
    particleCount: number;
    enableMouse: boolean;
}

export function VertexBackground(props: BackgroundProps): JSX.Element {
    let canvas: HTMLCanvasElement = undefined;

    onMount(() => initDraw(props.particleCount, props.enableMouse, canvas));

    return <canvas
        ref={canvas}
        width={window.visualViewport.width}
        height={window.visualViewport.height} // TODO: not scaling properly?
        class={props.class || ""}
    />
}
