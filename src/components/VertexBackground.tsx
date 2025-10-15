import { JSX, onCleanup, onMount } from "solid-js";
import { ClassProps } from "./ClassProps";

// This was initially inspired by Vitox's particle library from LiquidBounce:
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

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
    return {
        x: randomInRange(0, canvasWidth),
        y: randomInRange(0, canvasHeight),
        angle: randomInRange(0, 365),
        speed: randomInRange(0.1, 0.15),
        size: 0.5 + Math.random() * 1.3,
    };
}

// Models: https://www.desmos.com/calculator/kgbnufgauj

function requiredParticleCount(canvasWidth: number): number {
    return Math.trunc(Math.sqrt(canvasWidth) * 1.5);
}

function requiredLineLength(canvasWidth: number): number {
    return canvasWidth / 20 + 100;
}

function drawParticle(
    p: Particle,
    isMouse: boolean,
    maxDistance: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
) {
    let connectingLines = 0;

    // Connect vertices
    for (const p2 of particles) {
        // Cheap way to avoid drawing the same line twice (one originating from each particle)
        if (p.x > p2.x && !isMouse) continue;

        const distance = Math.hypot(p2.x - p.x, p2.y - p.y);
        if (!distance || distance > maxDistance) continue;

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

function draw(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    mouseX?: number,
    mouseY?: number,
    mousePressed?: boolean,
) {
    ctx.reset();

    // Move points closer to point when mouse pressed
    if (mousePressed) {
        const speed = 0.15;

        for (const p of particles) {
            const slope = (mouseY - p.y) / (mouseX - p.x);
            const delta = Math.sqrt((speed ** 2) / (slope ** 2 + 1));
            p.x += delta * (mouseX >= p.x ? 1 : -1);
            p.y += delta * (mouseY >= p.y ? 1 : -1);
        }
    }

    const maxLineLength = requiredLineLength(canvas.width);

    for (const p1 of particles) {
        drawParticle(
            p1, false,
            maxLineLength, canvas, ctx, particles,
        );
    }

    if (mouseX || mouseY) {
        drawParticle(
            { x: mouseX, y: mouseY, angle: 0, speed: 0, size: 0, }, true,
            maxLineLength, canvas, ctx, particles,
        )
    }
}

function initDraw(
    enableMouse: boolean,
    canvas: HTMLCanvasElement,
) {
    const ctx = canvas.getContext("2d");
    const particles: Particle[] = new Array(requiredParticleCount(canvas.width));
    let canvasMouseX: number, canvasMouseY: number, mousePressed: boolean;

    // Initialize particles
    for (let i = 0; i < particles.length; i++) {
        particles[i] = createParticle(canvas.width, canvas.height);
    }

    const resizeListener = (_e: UIEvent) => {
        canvas.width = window.visualViewport.width;
        canvas.height = window.visualViewport.height;

        const newParticleCount = requiredParticleCount(canvas.width);
        while (particles.length > newParticleCount)
            particles.pop();
        while (particles.length < newParticleCount)
            particles.push(createParticle(canvas.width, canvas.height));
    }
    window.addEventListener("resize", resizeListener);

    const mouseListener = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        canvasMouseX = (e.clientX - rect.x) * scaleX;
        canvasMouseY = (e.clientY - rect.y) * scaleY;
        mousePressed = (e.buttons & 1) === 1; // Left Mouse Button
    };
    if (enableMouse) {
        window.addEventListener("mousemove", mouseListener);
        window.addEventListener("mouseup", mouseListener);
        window.addEventListener("mousedown", mouseListener);
    }

    let frameId: number;
    const drawWrap = (_time: DOMHighResTimeStamp) => {
        setTimeout(() => {
            frameId = requestAnimationFrame(drawWrap);
        }, 6);
        draw(canvas, ctx, particles, canvasMouseX, canvasMouseY, mousePressed);
    }
    frameId = requestAnimationFrame(drawWrap);

    onCleanup(() => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("mousemove", mouseListener);
        window.removeEventListener("mouseup", mouseListener);
        window.removeEventListener("mousedown", mouseListener);
        window.removeEventListener("resize", resizeListener);
    });
}

const isTouchDevice = "ontouchstart" in window;

export function VertexBackground(props: ClassProps): JSX.Element {
    let canvas: HTMLCanvasElement = undefined;

    onMount(() => initDraw(!isTouchDevice, canvas));

    return <canvas
        ref={canvas}
        width={window.visualViewport.width}
        height={window.visualViewport.height}
        class={props.class || ""}
    />
}
