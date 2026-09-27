import { useState, useEffect, useCallback, useRef } from "react";
import "./Preloader.css";

/**
 * Preloader v4 — Compact center name with expanding side lines.
 *
 * Layout:  ──────── SACHIN GUPTA ────────
 *               FULL STACK DEVELOPER
 *                  ████████ 72%
 *
 * Flow:
 *   1. Name scales in at center.
 *   2. Two lines expand outward from the name to screen edges.
 *   3. Role fades up.
 *   4. Progress bar + counter fill to 100%.
 *   5. Smooth fade-out exit.
 */
const Preloader = ({ onComplete }) => {
    const [exiting, setExiting] = useState(false);
    const [visible, setVisible] = useState(true);
    const [percent, setPercent] = useState(0);
    const rafRef = useRef(null);

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const TOTAL_DURATION = prefersReducedMotion ? 300 : 3500;
    const EXIT_DURATION = prefersReducedMotion ? 50 : 900;
    const COUNTER_START = prefersReducedMotion ? 0 : 1600;
    const COUNTER_DURATION = prefersReducedMotion ? 1 : 1600;

    const handleExit = useCallback(() => {
        setExiting(true);
        setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, EXIT_DURATION);
    }, [onComplete, EXIT_DURATION]);

    /* Percentage counter */
    useEffect(() => {
        if (prefersReducedMotion) { setPercent(100); return; }

        const timeout = setTimeout(() => {
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min((now - start) / COUNTER_DURATION, 1);
                setPercent(Math.round(t * 100));
                if (t < 1) rafRef.current = requestAnimationFrame(tick);
            };
            rafRef.current = requestAnimationFrame(tick);
        }, COUNTER_START);

        return () => {
            clearTimeout(timeout);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [prefersReducedMotion, COUNTER_START, COUNTER_DURATION]);

    /* Main timer */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const timer = setTimeout(handleExit, TOTAL_DURATION);
        return () => { clearTimeout(timer); document.body.style.overflow = ""; };
    }, [handleExit, TOTAL_DURATION]);

    if (!visible) return null;

    return (
        <div className={`preloader${exiting ? " preloader--exit" : ""}`} aria-hidden="true">
            <div className="preloader__grid" />
            <div className="preloader__ambient preloader__ambient--1" />
            <div className="preloader__ambient preloader__ambient--2" />
            <div className="preloader__vignette" />

            <div className="preloader__content">
                {/* ── Line · Name · Line ── */}
                <div className="preloader__name-row">
                    <div className="preloader__side-line preloader__side-line--left" />
                    <h1 className="preloader__name">SACHIN GUPTA</h1>
                    <div className="preloader__side-line preloader__side-line--right" />
                </div>

                <p className="preloader__role">Full Stack Developer</p>

                <div className="preloader__progress">
                    <div className="preloader__bar preloader__bar--animate" />
                </div>

                <div className="preloader__percent">
                    <span>{percent}</span>%
                </div>
            </div>
        </div>
    );
};

export default Preloader;
