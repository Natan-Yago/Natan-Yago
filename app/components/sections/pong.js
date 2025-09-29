"use client";

import { useEffect, useRef, useState } from "react";
import Grid, { GridRow } from "@/components/ui/grid";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const getHslFromVar = (element, varName, alpha = 1) => {
  const root = element ?? document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue(varName).trim();
  if (!raw) return `hsl(0 0% 0% / ${alpha})`;
  return `hsl(${raw} / ${alpha})`;
};

const PongCanvas = () => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const runningRef = useRef(false);
  const startedRef = useRef(false);

  const playerXRef = useRef(0);
  const botXRef = useRef(0);
  const ballRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, r: 4 });
  const sizeRef = useRef({ width: 0, height: 0 });
  const serveToPlayerRef = useRef(true);

  const [score, setScore] = useState({ player: 0, bot: 0 });
  const [showStart, setShowStart] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const getPaddleMetrics = () => {
    const { width, height } = sizeRef.current;
    const paddleWidth = clamp(Math.round(width * 0.14), 45, 100);
    const paddleHeight = 2;
    const edgeMargin = 12;
    const playerY = height - paddleHeight - edgeMargin;
    const botY = edgeMargin;
    return { paddleWidth, paddleHeight, playerY, botY, edgeMargin };
  };

  const resizeCanvas = () => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = wrapper.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    sizeRef.current = { width, height };

    if (
      canvas.width !== Math.floor(width * dpr) ||
      canvas.height !== Math.floor(height * dpr)
    ) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Initialize positions aligned with current width
    const { paddleWidth, playerY, botY } = getPaddleMetrics();
    playerXRef.current = clamp(
      playerXRef.current || width / 2 - paddleWidth / 2,
      0,
      width - paddleWidth
    );
    botXRef.current = clamp(
      botXRef.current || width / 2 - paddleWidth / 2,
      0,
      width - paddleWidth
    );

    // Place ball at center on resize if not started
    if (!startedRef.current) {
      ballRef.current.x = width / 2;
      ballRef.current.y = (playerY + botY) / 2;
    }
  };

  const serveBall = (toPlayer) => {
    const { width, height } = sizeRef.current;
    const { playerY, botY } = getPaddleMetrics();
    const x = width / 2;
    const y = toPlayer ? botY + 40 : playerY - 40;
    const speed = 3; // base speed
    const angle = (Math.random() * 0.6 - 0.3) * Math.PI; // small horizontal variance
    const vy = toPlayer ? speed : -speed;
    const vx = Math.sin(angle) * speed * 0.9;
    ballRef.current = { x, y, vx, vy, r: 4 };
  };

  const step = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const wrapper = wrapperRef.current;
    if (!ctx || !wrapper) return;

    const objectColor = getHslFromVar(wrapper, "--muted-foreground");
    const canvasBg = getHslFromVar(wrapper, "--background");
    const { width, height } = sizeRef.current;
    const { paddleWidth, paddleHeight, playerY, botY, edgeMargin } =
      getPaddleMetrics();

    // Bot AI: follow the ball with capped speed and a slight offset error
    const botSpeed = 2.2; // easy
    const targetBotX = clamp(
      ballRef.current.x - paddleWidth / 2 + 6,
      0,
      width - paddleWidth
    );
    const dx = targetBotX - botXRef.current;
    botXRef.current += clamp(dx, -botSpeed, botSpeed);

    // Move ball
    ballRef.current.x += ballRef.current.vx;
    ballRef.current.y += ballRef.current.vy;

    // Collide walls (left/right)
    if (ballRef.current.x - ballRef.current.r < 0) {
      ballRef.current.x = ballRef.current.r;
      ballRef.current.vx *= -1;
    } else if (ballRef.current.x + ballRef.current.r > width) {
      ballRef.current.x = width - ballRef.current.r;
      ballRef.current.vx *= -1;
    }

    // Collide with player paddle
    const playerX = playerXRef.current;
    if (
      ballRef.current.y + ballRef.current.r >= playerY &&
      ballRef.current.y + ballRef.current.r <= playerY + paddleHeight + 2 &&
      ballRef.current.x >= playerX &&
      ballRef.current.x <= playerX + paddleWidth
    ) {
      ballRef.current.y = playerY - ballRef.current.r;
      ballRef.current.vy *= -1;
      // add horizontal tweak based on hit position
      const hitPos =
        (ballRef.current.x - (playerX + paddleWidth / 2)) / (paddleWidth / 2);
      ballRef.current.vx += hitPos * 0.8;
    }

    // Collide with bot paddle
    const botX = botXRef.current;
    if (
      ballRef.current.y - ballRef.current.r <= botY + paddleHeight &&
      ballRef.current.y - ballRef.current.r >= botY - 2 &&
      ballRef.current.x >= botX &&
      ballRef.current.x <= botX + paddleWidth
    ) {
      ballRef.current.y = botY + paddleHeight + ballRef.current.r;
      ballRef.current.vy *= -1;
      const hitPos =
        (ballRef.current.x - (botX + paddleWidth / 2)) / (paddleWidth / 2);
      ballRef.current.vx += hitPos * 0.6;
    }

    // Scoring (missed paddles)
    if (ballRef.current.y - ballRef.current.r < 0) {
      // player scores
      setScore((s) => ({ ...s, player: s.player + 1 }));
      serveToPlayerRef.current = false;
      serveBall(true);
    } else if (ballRef.current.y + ballRef.current.r > height) {
      // bot scores
      setScore((s) => ({ ...s, bot: s.bot + 1 }));
      serveToPlayerRef.current = true;
      serveBall(false);
    }

    // Draw
    ctx.clearRect(0, 0, width, height);
    // white background for the playfield
    ctx.fillStyle = canvasBg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = objectColor;
    // Paddles
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
    ctx.fillRect(botX, botY, paddleWidth, paddleHeight);
    // Ball
    ctx.beginPath();
    ctx.arc(
      ballRef.current.x,
      ballRef.current.y,
      ballRef.current.r,
      0,
      Math.PI * 2
    );
    ctx.fill();

    if (runningRef.current) {
      animationRef.current = requestAnimationFrame(step);
    }
  };

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    runningRef.current = true;
    setIsRunning(true);
    setShowStart(false);
    serveBall(serveToPlayerRef.current);
    animationRef.current = requestAnimationFrame(step);
  };

  const stop = () => {
    runningRef.current = false;
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const handleVisibility = () => {
    if (document.hidden) {
      stop();
    } else if (startedRef.current) {
      if (!runningRef.current) {
        runningRef.current = true;
        setIsRunning(true);
        animationRef.current = requestAnimationFrame(step);
      }
    }
  };

  const handlePointerMove = (e) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const { paddleWidth } = getPaddleMetrics();
    playerXRef.current = clamp(
      x - paddleWidth / 2,
      0,
      rect.width - paddleWidth
    );
  };

  const pause = () => {
    stop();
  };

  const resume = () => {
    if (!startedRef.current) return;
    if (runningRef.current) return;
    runningRef.current = true;
    setIsRunning(true);
    animationRef.current = requestAnimationFrame(step);
  };

  // Keep ref in sync with state to avoid stale closures
  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full select-none"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Score and Pause */}
      {(() => {
        const { edgeMargin } = getPaddleMetrics();
        return (
          <div
            className="pointer-events-none absolute inset-0 flex items-start justify-between text-[11px] leading-none text-muted-foreground"
            style={{ padding: edgeMargin }}
          >
            <div className="pointer-events-none bg-background/60 rounded px-2 py-1 border border-border">
              You {score.player} — {score.bot} Bot
            </div>
            {!showStart && (
              <button
                type="button"
                onClick={() => (isRunning ? pause() : resume())}
                className="pointer-events-auto bg-background/60 hover:bg-background/80 transition-colors rounded px-2 py-1 border border-border text-foreground"
                aria-label={isRunning ? "Pause Pong" : "Resume Pong"}
              >
                {isRunning ? "Pause" : "Resume"}
              </button>
            )}
          </div>
        );
      })()}

      {/* Start Overlay */}
      {showStart && (
        <div className="absolute inset-0 grid place-items-center bg-muted/60">
          <button
            type="button"
            onClick={start}
            className="bg-background text-foreground border border-border rounded px-3 py-1 text-sm hover:text-primary transition-colors"
            aria-label="Start Pong"
          >
            Start
          </button>
        </div>
      )}

      {/* Paused Overlay: minimal play button */}
      {!showStart && !isRunning && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <button
            type="button"
            onClick={resume}
            className="pointer-events-auto w-9 h-9 rounded-full grid place-items-center bg-background/80 text-foreground border border-border hover:bg-background transition-colors"
            aria-label="Resume Pong"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
              <polygon points="9,7 9,17 16,12" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default function PongSection() {
  return (
    <section id="pong">
      <Grid>
        <GridRow
          centerMuted={false}
          centerPadding="p-0"
          center={<PongCanvas />}
        />
        <GridRow />
      </Grid>
    </section>
  );
}
