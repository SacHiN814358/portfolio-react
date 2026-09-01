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

        // Silky smooth multi-node spline trail
        const trailLength = 26
        const trail = []
        for (let i = 0; i < trailLength; i++) {
            trail.push({ x: -100, y: -100, vx: 0, vy: 0 })
        }

        // Smoothly animated properties
        let currentRingRadius = 14
        let currentHaloRadius = 22
        let currentCornerDist = 0
        let currentAlpha = 0

        // Click shockwaves with smooth easing
        const shockwaves = []

        class Shockwave {
            constructor(x, y) {
                this.x = x
                this.y = y
                this.radius = 4
                this.maxRadius = 55
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
                ctx.strokeStyle = `rgba(223, 137, 8, ${Math.max(0, this.alpha)})`
                ctx.shadowColor = "#b415ff"
                ctx.shadowBlur = 18
                ctx.lineWidth = 2
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

                // Fluid spring damping for silky liquid drag
                const spring = 0.48 - (i / trailLength) * 0.08
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
                const pulse = Math.sin(pulseTime) * 1.5

                // Smooth radius interpolation
                const targetRing = isMouseDown ? 10 : isHovered ? 28 : 15
                currentRingRadius += (targetRing - currentRingRadius) * 0.18

                const targetHalo = isHovered ? 42 : 24
                currentHaloRadius += (targetHalo - currentHaloRadius) * 0.15

                const targetCorner = isHovered ? currentRingRadius + 5 : 0
                currentCornerDist += (targetCorner - currentCornerDist) * 0.2

                // 1. LIQUID SILK RIBBON USING QUADRATIC CURVES
                ctx.save()
                ctx.globalAlpha = currentAlpha

                for (let i = trailLength - 1; i > 0; i--) {
                    const p1 = trail[i]
                    const p2 = trail[i - 1]

                    const progress = 1 - i / trailLength
                    const lineWidth = (isHovered ? 14 : 9) * progress

                    // Smooth Theme Gradient Transitions along the curve
                    let strokeColor
                    if (progress > 0.65) {
                        strokeColor = `rgba(223, 137, 8, ${progress * 0.88})`
                    } else if (progress > 0.35) {
                        strokeColor = `rgba(209, 77, 157, ${progress * 0.82})`
                    } else {
                        strokeColor = `rgba(180, 21, 255, ${progress * 0.72})`
                    }

                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)

                    // Curve smoothly between node midpoints
                    const midX = (p1.x + p2.x) / 2
                    const midY = (p1.y + p2.y) / 2
                    ctx.quadraticCurveTo(p1.x, p1.y, midX, midY)
                    ctx.lineTo(p2.x, p2.y)

                    ctx.strokeStyle = strokeColor
                    ctx.lineWidth = lineWidth
                    ctx.lineCap = "round"
                    ctx.lineJoin = "round"
                    ctx.shadowColor = progress > 0.5 ? "#df8908" : "#b415ff"
                    ctx.shadowBlur = isHovered ? 20 : 14
                    ctx.stroke()
                }
                ctx.restore()

                // 2. SOFT AMBIENT GLOW ORB
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
                orbGrad.addColorStop(0, isHovered ? "rgba(223, 137, 8, 0.4)" : "rgba(180, 21, 255, 0.35)")
                orbGrad.addColorStop(0.55, isHovered ? "rgba(209, 77, 157, 0.18)" : "rgba(180, 21, 255, 0.12)")
                orbGrad.addColorStop(1, "transparent")

                ctx.fillStyle = orbGrad
                ctx.beginPath()
                ctx.arc(smoothMouse.x, smoothMouse.y, currentHaloRadius, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()

                // 3. TARGET FOCUS RING (Seamless Eased Morphing)
                ctx.save()
                ctx.globalAlpha = currentAlpha
                const finalRingR = Math.max(2, currentRingRadius + pulse)

                ctx.beginPath()
                ctx.arc(smoothMouse.x, smoothMouse.y, finalRingR, 0, Math.PI * 2)
                ctx.strokeStyle = isHovered ? "#df8908" : "rgba(255, 255, 255, 0.85)"
                ctx.lineWidth = isHovered ? 2.2 : 1.5
                ctx.shadowColor = isHovered ? "#df8908" : "#b415ff"
                ctx.shadowBlur = isHovered ? 20 : 12
                ctx.stroke()

                // Smoothly fading Corner Marks
                if (currentCornerDist > 5) {
                    const markAlpha = Math.min(1, (currentCornerDist - 5) / 15)
                    ctx.strokeStyle = `rgba(255, 60, 172, ${markAlpha})`
                    ctx.lineWidth = 2
                    ctx.shadowColor = "#ff3cac"
                    ctx.shadowBlur = 10

                    const d = currentCornerDist
                    const l = 6

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
                ctx.arc(smoothMouse.x, smoothMouse.y, isHovered ? 3.5 : 2.5, 0, Math.PI * 2)
                ctx.fillStyle = "#ffffff"
                ctx.shadowColor = "#ffffff"
                ctx.shadowBlur = 12
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