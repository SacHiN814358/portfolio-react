import { useRef, useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import "./Contact.css"

const Contact = () => {
    const form = useRef()
    const [selectedService, setSelectedService] = useState("Web Development")
    const [copiedEmail, setCopiedEmail] = useState(false)
    const [status, setStatus] = useState("idle") // "idle" | "sending" | "success" | "error"
    const [errorMessage, setErrorMessage] = useState("")

    // Initialize EmailJS once when component mounts
    useEffect(() => {
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
    }, [])

    const services = [
        "Web Development",
        "React / Frontend",
        "UI / UX Design",
        "Full-time Role",
        "Other"
    ]

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText("sachingupta00134@gmail.com")
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2500)
    }

    const sendEmail = async (e) => {
        e.preventDefault()
        setStatus("sending")
        setErrorMessage("")

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        console.log("EmailJS Config:", { serviceId, templateId, publicKey: publicKey ? "***set***" : "MISSING" })

        if (!serviceId || !templateId || !publicKey) {
            setStatus("error")
            setErrorMessage("Email service is not configured. Please check environment variables.")
            return
        }

        try {
            const result = await emailjs.sendForm(
                serviceId,
                templateId,
                form.current,
                { publicKey }
            )
            console.log("EmailJS success:", result)
            setStatus("success")
            e.target.reset()
            setTimeout(() => setStatus("idle"), 6000)
        } catch (error) {
            console.error("EmailJS Error full object:", error)
            console.error("Status:", error?.status)
            console.error("Text:", error?.text)
            console.error("Message:", error?.message)
            setStatus("error")
            const msg = error?.text || error?.message || String(error) || "Failed to send message."
            setErrorMessage(msg)
            setTimeout(() => setStatus("idle"), 6000)
        }
    }

    return (
        <section id="contact" className="contact-section">
            {/* Ambient Background Glows */}
            <div className="contact-glow contact-glow-1"></div>
            <div className="contact-glow contact-glow-2"></div>

            <div className="contact-container">

                {/* ================= HEADER ================= */}
                <div className="contact-header">
                    <div className="contact-label">
                        <span></span>
                        05 — GET IN TOUCH
                    </div>
                    <div className="contact-heading-wrap">
                        <h2>
                            Let's build something <span>extraordinary.</span>
                        </h2>
                        <p>
                            Have a project in mind, looking for a frontend developer, or just want to connect?
                            Drop a message and I'll get back to you within 24 hours.
                        </p>
                    </div>
                </div>

                {/* ================= MAIN GRID ================= */}
                <div className="contact-grid">

                    {/* LEFT: Info & Live Availability */}
                    <div className="contact-left-col">

                        {/* Availability Pill */}
                        <div className="availability-card">
                            <div className="status-indicator">
                                <span className="status-dot"></span>
                                <span className="status-ping"></span>
                            </div>
                            <div className="availability-text">
                                <h4>Available for Work</h4>
                                <p>Open to frontend roles, freelance & collaboration</p>
                            </div>
                        </div>

                        {/* Direct Contact Cards */}
                        <div className="contact-cards">

                            {/* Email Card with Copy Feature */}
                            <div className="contact-card" onClick={copyEmailToClipboard} title="Click to copy email">
                                <div className="card-icon-box">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                </div>
                                <div className="card-info">
                                    <span className="card-label">EMAIL ME</span>
                                    <span className="card-value">sachingupta00134@gmail.com</span>
                                </div>
                                <button type="button" className="copy-action-btn" aria-label="Copy email">
                                    {copiedEmail ? (
                                        <span className="copied-tag">Copied! ✓</span>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Phone / WhatsApp Card */}
                            <a href="https://wa.me/919913629460" target="_blank" rel="noopener noreferrer" className="contact-card">
                                <div className="card-icon-box">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <div className="card-info">
                                    <span className="card-label">CALL / WHATSAPP</span>
                                    <span className="card-value">+91 9913629460</span>
                                </div>
                                <span className="card-arrow">↗</span>
                            </a>

                            {/* Location Card */}
                            <div className="contact-card">
                                <div className="card-icon-box">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div className="card-info">
                                    <span className="card-label">LOCATION</span>
                                    <span className="card-value">Gujarat, India <span className="tz-pill">IST (UTC+5:30)</span></span>
                                </div>
                            </div>

                        </div>

                        {/* Social Presence */}
                        <div className="contact-social-section">
                            <span className="social-heading">CONNECT ON SOCIALS</span>
                            <div className="social-pills">
                                <a href="https://github.com/SacHiN814358" target="_blank" rel="noopener noreferrer" className="social-pill">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://wa.me/919913629460" target="_blank" rel="noopener noreferrer" className="social-pill">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <span>WhatsApp</span>
                                </a>
                                <a href="https://www.instagram.com/sachiin._15" target="_blank" rel="noopener noreferrer" className="social-pill">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                    </svg>
                                    <span>Instagram</span>
                                </a>
                            </div>
                        </div>

                    </div>


                    {/* RIGHT: Modern Interactive Form */}
                    <div className="contact-right-col">
                        <div className="contact-form-glass">

                            <div className="form-top">
                                <h3>Send a Message</h3>
                                <p>Fill out the details below to start a conversation</p>
                            </div>

                            {/* Service / Project Type Selector */}
                            <div className="service-selector">
                                <label className="form-group-label">I'm interested in:</label>
                                <div className="service-chips">
                                    {services.map((srv) => (
                                        <button
                                            key={srv}
                                            type="button"
                                            className={`service-chip ${selectedService === srv ? "active" : ""}`}
                                            onClick={() => setSelectedService(srv)}
                                        >
                                            {srv}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <form ref={form} onSubmit={sendEmail} className="modern-form">
                                {/* Hidden field for selected interest/subject */}
                                <input type="hidden" name="subject" value={`Portfolio Inquiry - ${selectedService}`} />
                                <input type="hidden" name="service_type" value={selectedService} />

                                <div className="form-row">
                                    <div className="input-group">
                                        <label htmlFor="user_name">Your Name</label>
                                        <div className="input-wrapper">
                                            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            <input
                                                id="user_name"
                                                type="text"
                                                name="name"
                                                placeholder="e.g. John Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="user_email">Your Email</label>
                                        <div className="input-wrapper">
                                            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                            </svg>
                                            <input
                                                id="user_email"
                                                type="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="user_message">Your Message</label>
                                    <div className="input-wrapper textarea-wrapper">
                                        <textarea
                                            id="user_message"
                                            name="message"
                                            rows={5}
                                            placeholder="Tell me about your project, goals, or role..."
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`submit-btn ${status === "sending" ? "is-sending" : ""}`}
                                    disabled={status === "sending"}
                                >
                                    {status === "sending" ? (
                                        <span className="btn-content">
                                            <span className="spinner"></span>
                                            Sending Message...
                                        </span>
                                    ) : (
                                        <span className="btn-content">
                                            Send Message
                                            <span className="btn-arrow">↗</span>
                                        </span>
                                    )}
                                </button>

                                {/* Inline Status Alerts */}
                                {status === "success" && (
                                    <div className="status-feedback status-feedback--success">
                                        <div className="feedback-icon">✓</div>
                                        <div>
                                            <strong>Thank you! Message sent successfully.</strong>
                                            <p>I have received your email and will respond shortly.</p>
                                        </div>
                                    </div>
                                )}

                                {status === "error" && (
                                    <div className="status-feedback status-feedback--error">
                                        <div className="feedback-icon">✕</div>
                                        <div>
                                            <strong>Message failed to send.</strong>
                                            <p>{errorMessage || "Please try again or email directly at sachingupta00134@gmail.com"}</p>
                                        </div>
                                    </div>
                                )}

                                <p className="direct-email-note">
                                    Prefer standard mail? <a href="mailto:sachingupta00134@gmail.com">Send an email directly ↗</a>
                                </p>
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Contact