import { useEffect, useRef, useState } from "react"
import "./CursorTrackingAvatar.css"

// =====================================================
// CONFIG
// =====================================================
const TOTAL_FRAMES = 64
const LERP_FACTOR = 0.10         // Snappy, smooth angle tracking
const IDLE_LERP_FACTOR = 0.05    // Smooth return to front-facing on idle
const IDLE_TIMEOUT_MS = 2000     // 2 seconds of inactivity
const DEADZONE_RADIUS = 0.12     // 12% face radius for direct eye contact
const MAX_TILT_DEG = 5.0         // Subtle 3D tilt limit (degrees)
const MAX_PARALLAX_PX = 4.0      // Subtle 3D parallax shift (pixels)

// Helper: Circular shortest-path angle lerp normalized to [0, 2*PI)
function lerpAngle(current, target, factor) {
    let diff = target - current
    while (diff > Math.PI) diff -= 2 * Math.PI
    while (diff < -Math.PI) diff += 2 * Math.PI
    let next = current + diff * factor
    while (next < 0) next += 2 * Math.PI
    while (next >= 2 * Math.PI) next -= 2 * Math.PI
    return next
}

const CursorTrackingAvatar = () => {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const [loaded, setLoaded] = useState(false)

    // Animation and tracking state kept entirely in mutable refs (0 React re-renders)
    const tracking = useRef({
        mouseX: 0,
        mouseY: 0,
        lastMoveTime: 0,
        isIdle: true,
        isTouch: false,
        // Angle tracking
        currentAngle: 0,
        targetAngle: 0,
        // 3D Tilt and Parallax
        currentTiltX: 0,
        currentTiltY: 0,
        targetTiltX: 0,
        targetTiltY: 0,
        currentTransX: 0,
        currentTransY: 0,
        targetTransX: 0,
        targetTransY: 0,
        // Frames
        frames: [],
        centerFrame: null,
        animId: null,
    })

    // 1. Detect Touch Device / Mobile
    useEffect(() => {
        tracking.current.isTouch = (
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.innerWidth <= 768
        )
    }, [])

    // 2. Preload 64 Loop Frames + Center Frame
    useEffect(() => {
        const t = tracking.current
        let loadedCount = 0
        const totalToLoad = TOTAL_FRAMES + 1

        const onImageLoad = () => {
            loadedCount++
            if (loadedCount >= totalToLoad) {
                setLoaded(true)
            }
        }

        // Preload Center Frame
        const centerImg = new Image()
        centerImg.src = "/frames/center.webp"
        centerImg.onload = onImageLoad
        centerImg.onerror = onImageLoad
        t.centerFrame = centerImg

        // Preload 64 Directional Frames
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image()
            img.src = `/frames/frame_${String(i).padStart(2, "0")}.webp`
            img.onload = onImageLoad
            img.onerror = onImageLoad
            t.frames[i] = img
        }
    }, [])

    // 3. Mouse Event Listener — Highly optimized, passive, global
    useEffect(() => {
        const t = tracking.current

        const handleMouseMove = (e) => {
            if (t.isTouch) return
            t.mouseX = e.clientX
            t.mouseY = e.clientY
            t.lastMoveTime = performance.now()
            t.isIdle = false
        }

        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // 4. 60 FPS / 120 FPS requestAnimationFrame Rendering Loop
    useEffect(() => {
        if (!loaded) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        const t = tracking.current

        // Initialize last move time so it starts in idle center position
        t.lastMoveTime = performance.now() - IDLE_TIMEOUT_MS - 100

        const render = (now) => {
            t.animId = requestAnimationFrame(render)

            const container = containerRef.current
            if (!container) return

            const rect = container.getBoundingClientRect()
            const faceCenterX = rect.left + rect.width * 0.5
            const faceCenterY = rect.top + rect.height * 0.45 // Face is around 45% height
            const dx = t.mouseX - faceCenterX
            const dy = t.mouseY - faceCenterY
            const distFromFace = Math.hypot(dx, dy)
            const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.5

            // --- IDLE & DEADZONE LOGIC ---
            // If inactive for > 2 seconds, or cursor within deadzone (~12% face radius), or on mobile
            const isInactive = (now - t.lastMoveTime) > IDLE_TIMEOUT_MS
            const isDeadzone = distFromFace < (rect.width * DEADZONE_RADIUS)

            if (isInactive || isDeadzone || t.isTouch) {
                t.isIdle = true
                t.targetTiltX = 0
                t.targetTiltY = 0
                t.targetTransX = 0
                t.targetTransY = 0
            } else {
                t.isIdle = false

                // Calculate angle from center of face to mouse:
                // dy > 0 is DOWN, dx > 0 is RIGHT, dy < 0 is UP, dx < 0 is LEFT
                const angle = Math.atan2(dy, dx)
                // Normalize angle so UP (-PI/2) maps to 0:
                let phi = angle + Math.PI / 2
                while (phi < 0) phi += 2 * Math.PI
                while (phi >= 2 * Math.PI) phi -= 2 * Math.PI
                t.targetAngle = phi

                // Subtle 3D tilt & parallax (bounded)
                const normX = Math.max(-1, Math.min(1, dx / (maxRadius * 0.8)))
                const normY = Math.max(-1, Math.min(1, dy / (maxRadius * 0.8)))

                t.targetTiltX = -normY * MAX_TILT_DEG
                t.targetTiltY = normX * MAX_TILT_DEG
                t.targetTransX = normX * MAX_PARALLAX_PX
                t.targetTransY = normY * MAX_PARALLAX_PX
            }

            // --- SMOOTH LERP INTERPOLATION ---
            const lerpFactor = t.isIdle ? IDLE_LERP_FACTOR : LERP_FACTOR

            if (!t.isIdle) {
                t.currentAngle = lerpAngle(t.currentAngle, t.targetAngle, lerpFactor)
            }
            t.currentTiltX += (t.targetTiltX - t.currentTiltX) * lerpFactor
            t.currentTiltY += (t.targetTiltY - t.currentTiltY) * lerpFactor
            t.currentTransX += (t.targetTransX - t.currentTransX) * lerpFactor
            t.currentTransY += (t.targetTransY - t.currentTransY) * lerpFactor

            // --- DRAW FRAME ON CANVAS ---
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (t.isIdle || t.isTouch) {
                // Front-facing direct eye contact
                if (t.centerFrame && t.centerFrame.complete) {
                    ctx.drawImage(t.centerFrame, 0, 0, canvas.width, canvas.height)
                }
            } else {
                // Map current smoothed angle [0, 2*PI) to frame index 0..63
                let safeAngle = t.currentAngle % (2 * Math.PI)
                if (safeAngle < 0) safeAngle += 2 * Math.PI
                const normalizedFraction = safeAngle / (2 * Math.PI)
                const frameIndex = Math.floor(normalizedFraction * TOTAL_FRAMES) % TOTAL_FRAMES
                const activeFrame = t.frames[frameIndex]

                if (activeFrame && activeFrame.complete) {
                    ctx.drawImage(activeFrame, 0, 0, canvas.width, canvas.height)
                } else if (t.centerFrame && t.centerFrame.complete) {
                    ctx.drawImage(t.centerFrame, 0, 0, canvas.width, canvas.height)
                }
            }

            // --- APPLY GPU TRANSFORM (SUBTLE 3D PARALLAX) ---
            canvas.style.transform = `translate3d(${t.currentTransX.toFixed(2)}px, ${t.currentTransY.toFixed(2)}px, 0) rotateX(${t.currentTiltX.toFixed(2)}deg) rotateY(${t.currentTiltY.toFixed(2)}deg)`
        }

        t.animId = requestAnimationFrame(render)

        return () => {
            if (t.animId) cancelAnimationFrame(t.animId)
        }
    }, [loaded])

    return (
        <div className="ct-avatar-container" ref={containerRef}>
            <canvas
                ref={canvasRef}
                className="ct-canvas"
                width={720}
                height={720}
            />
        </div>
    )
}

export default CursorTrackingAvatar
