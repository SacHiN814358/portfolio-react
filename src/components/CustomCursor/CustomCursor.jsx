import { useEffect, useRef } from "react"
import "./CustomCursor.css"

const CustomCursor = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")

        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        let mouse = { x: -100, y: -100 }
        let smoothMouse = { x: -100, y: -100 }
        let isHovered = false
        let isVisible = false
        let isMouseDown = false
        let animationFrameId = null

        // Silky smooth multi-node trail
        const trailLength = 22
        const trail = []
        for (let i = 0; i < trailLength; i++) {
            trail.push({ x: -100, y: -100 })
        }

        // Smoothly animated properties
        let currentRingRadius = 14
        let currentHaloRadius = 20
        let currentCornerDist = 0
        let currentAlpha = 0

        // Click shockwaves with smooth easing
        const shockwaves = []

        class Shockwave {
            constructor(x, y) {
                this.x = x
                this.y = y
                this.radius = 4
                this.maxRadius = 50
                this.alpha = 1
            }
            update() {
                this.radius += (this.maxRadius - this.radius) * 0.18
                this.alpha -= 0.04
            }
            draw(ctx) {
                if (this.alpha <= 0) return
                ctx.save()
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(230, 57, 70, ${Math.max(0, this.alpha * 0.85)})`
                ctx.shadowColor = "#E63946"
                ctx.shadowBlur = 12
                ctx.lineWidth = 1.5
                ctx.stroke()
                ctx.restore()
            }
        }

        const onResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        const onMouseMove = (e) => {
            isVisible = true
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const onMouseDown = (e) => {
            isMouseDown = true
            shockwaves.push(new Shockwave(e.clientX, e.clientY))
        }

        const onMouseUp = () => {
            isMouseDown = false
        }

        const onMouseLeave = () => {
            isVisible = false
        }

        const onMouseEnter = () => {
            isVisible = true
        }

        const onMouseOver = (e) => {
            const target = e.target
            if (!target) return
            const isInteractive = target.closest(
                'a, button, input, textarea, select, [role="button"], .contact-card, .service-item, .work-card, .skill-card, .theme-switch, .hamburger'
            )
            isHovered = Boolean(isInteractive)
        }

        let pulseTime = 0

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // Smooth mouse entry/exit alpha
            currentAlpha += ((isVisible ? 1 : 0) - currentAlpha) * 0.15

            // Smooth pointer position tracking
            smoothMouse.x += (mouse.x - smoothMouse.x) * 0.75
            smoothMouse.y += (mouse.y - smoothMouse.y) * 0.75

            // Update smooth physics trail nodes
            trail[0].x = smoothMouse.x
            trail[0].y = smoothMouse.y

            for (let i = 1; i < trailLength; i++) {
                const prev = trail[i - 1]
                const curr = trail[i]
                const spring = 0.50 - (i / trailLength) * 0.08
                curr.x += (prev.x - curr.x) * spring
                curr.y += (prev.y - curr.y) * spring
            }

            // Draw Shockwaves
            for (let i = shockwaves.length - 1; i >= 0; i--) {
                const sw = shockwaves[i]
                sw.update()
                sw.draw(ctx)
                if (sw.alpha <= 0) {
                    shockwaves.splice(i, 1)
                }
            }

            if (currentAlpha > 0.01 && mouse.x > 0 && mouse.y > 0) {
                pulseTime += 0.04
                const pulse = Math.sin(pulseTime) * 1.2

                // Smooth radius interpolation
                const targetRing = isMouseDown ? 10 : isHovered ? 26 : 14
                currentRingRadius += (targetRing - currentRingRadius) * 0.18

                const targetHalo = isHovered ? 38 : 22
                currentHaloRadius += (targetHalo - currentHaloRadius) * 0.15

                const targetCorner = isHovered ? currentRingRadius + 4 : 0
                currentCornerDist += (targetCorner - currentCornerDist) * 0.2

                // 1. LIQUID RED TRAIL
                ctx.save()
                ctx.globalAlpha = currentAlpha

                for (let i = trailLength - 1; i > 0; i--) {
                    const p1 = trail[i]
                    const p2 = trail[i - 1]

                    const progress = 1 - i / trailLength
                    const lineWidth = (isHovered ? 12 : 7) * progress

                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)
                    const midX = (p1.x + p2.x) / 2
                    const midY = (p1.y + p2.y) / 2
                    ctx.quadraticCurveTo(p1.x, p1.y, midX, midY)
                    ctx.lineTo(p2.x, p2.y)

                    ctx.strokeStyle = `rgba(230, 57, 70, ${progress * 0.85})`
                    ctx.lineWidth = lineWidth
                    ctx.lineCap = "round"
                    ctx.lineJoin = "round"
                    ctx.shadowColor = "#E63946"
                    ctx.shadowBlur = isHovered ? 16 : 10
                    ctx.stroke()
                }
                ctx.restore()

                // 2. SOFT AMBIENT GLOW ORB (Pure Red)
                ctx.save()
                ctx.globalAlpha = currentAlpha
                const orbGrad = ctx.createRadialGradient(
                    smoothMouse.x,
                    smoothMouse.y,
                    0,
                    smoothMouse.x,
                    smoothMouse.y,
                    currentHaloRadius
                )
                orbGrad.addColorStop(0, isHovered ? "rgba(230, 57, 70, 0.35)" : "rgba(230, 57, 70, 0.22)")
                orbGrad.addColorStop(0.6, "rgba(230, 57, 70, 0.08)")
                orbGrad.addColorStop(1, "transparent")

                ctx.fillStyle = orbGrad
                ctx.beginPath()
                ctx.arc(smoothMouse.x, smoothMouse.y, currentHaloRadius, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()

                // 3. TARGET FOCUS RING
                ctx.save()
                ctx.globalAlpha = currentAlpha
                const finalRingR = Math.max(2, currentRingRadius + pulse)

                ctx.beginPath()
                ctx.arc(smoothMouse.x, smoothMouse.y, finalRingR, 0, Math.PI * 2)
                ctx.strokeStyle = isHovered ? "#E63946" : "rgba(255, 255, 255, 0.9)"
                ctx.lineWidth = isHovered ? 2.0 : 1.4
                ctx.shadowColor = "#E63946"
                ctx.shadowBlur = isHovered ? 14 : 8
                ctx.stroke()

                // Smoothly fading Corner Marks
                if (currentCornerDist > 4) {
                    const markAlpha = Math.min(1, (currentCornerDist - 4) / 12)
                    ctx.strokeStyle = `rgba(230, 57, 70, ${markAlpha})`
                    ctx.lineWidth = 1.8
                    ctx.shadowColor = "#E63946"
                    ctx.shadowBlur = 8

                    const d = currentCornerDist
                    const l = 5

                    // Top
                    ctx.beginPath()
                    ctx.moveTo(smoothMouse.x, smoothMouse.y - d)
                    ctx.lineTo(smoothMouse.x, smoothMouse.y - d - l)
                    ctx.stroke()

                    // Bottom
                    ctx.beginPath()
                    ctx.moveTo(smoothMouse.x, smoothMouse.y + d)
                    ctx.lineTo(smoothMouse.x, smoothMouse.y + d + l)
                    ctx.stroke()

                    // Left
                    ctx.beginPath()
                    ctx.moveTo(smoothMouse.x - d, smoothMouse.y)
                    ctx.lineTo(smoothMouse.x - d - l, smoothMouse.y)
                    ctx.stroke()

                    // Right
                    ctx.beginPath()
                    ctx.moveTo(smoothMouse.x + d, smoothMouse.y)
                    ctx.lineTo(smoothMouse.x + d + l, smoothMouse.y)
                    ctx.stroke()
                }

                // 4. PRECISION CENTER CORE DOT
                ctx.beginPath()
                ctx.arc(smoothMouse.x, smoothMouse.y, isHovered ? 3.0 : 2.0, 0, Math.PI * 2)
                ctx.fillStyle = "#ffffff"
                ctx.shadowColor = "#E63946"
                ctx.shadowBlur = 8
                ctx.fill()
                ctx.restore()
            }

            animationFrameId = requestAnimationFrame(render)
        }

        window.addEventListener("resize", onResize)
        window.addEventListener("mousemove", onMouseMove, { passive: true })
        window.addEventListener("mousedown", onMouseDown)
        window.addEventListener("mouseup", onMouseUp)
        document.addEventListener("mouseleave", onMouseLeave)
        document.addEventListener("mouseenter", onMouseEnter)
        window.addEventListener("mouseover", onMouseOver, { passive: true })

        animationFrameId = requestAnimationFrame(render)

        return () => {
            window.removeEventListener("resize", onResize)
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mousedown", onMouseDown)
            window.removeEventListener("mouseup", onMouseUp)
            document.removeEventListener("mouseleave", onMouseLeave)
            document.removeEventListener("mouseenter", onMouseEnter)
            window.removeEventListener("mouseover", onMouseOver)
            if (animationFrameId) cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="neon-fluid-cursor-canvas"
        />
    )
}

export default CustomCursor