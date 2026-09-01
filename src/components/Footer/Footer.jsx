import "./Footer.css"
import { useTheme } from "../../context/ThemeContext"
import logoWhite from "../../assets/logo-whitee.png"
import logoBlack from "../../assets/logo-blackk.png"

const Footer = () => {
  const { isLight } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <img
            src={isLight ? logoWhite : logoBlack}
            alt="Sachin Logo"
            className="footer-brand-logo"
          />

          <p>
            Crafting modern, responsive and user-focused web
            experiences with clean code and thoughtful design.
          </p>

          <div className="footer-socials">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a
              href="mailto:sachingupta00134@gmail.com"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>

          </div>
        </div>


        {/* LINKS */}
        <div className="footer-column">
          <h3>LINKS</h3>
          <div className="footer-heading-line"></div>

          <a href="#home">
            <span className="footer-arrow">›</span> Home
          </a>

          <a href="#about">
            <span className="footer-arrow">›</span> About
          </a>

          <a href="#services">
            <span className="footer-arrow">›</span> Services
          </a>

          <a href="#work">
            <span className="footer-arrow">›</span> Work
          </a>

          <a href="#contact">
            <span className="footer-arrow">›</span> Contact
          </a>
        </div>


        {/* SERVICES */}
        <div className="footer-column">
          <h3>SERVICES</h3>
          <div className="footer-heading-line"></div>

          <a href="#services">
            <span className="footer-arrow">›</span> Web Development
          </a>

          <a href="#services">
            <span className="footer-arrow">›</span> UI/UX Design
          </a>

          <a href="#services">
            <span className="footer-arrow">›</span> Frontend Development
          </a>

          <a href="#services">
            <span className="footer-arrow">›</span> Responsive Design
          </a>
        </div>


        {/* CONTACT */}
        <div className="footer-column footer-contact">
          <h3>CONTACT</h3>
          <div className="footer-heading-line"></div>

          <a href="mailto:sachingupta00134@gmail.com">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <span>sachingupta00134@gmail.com</span>
          </a>

          <a href="tel:+919913629460">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+91 9913629460</span>
          </a>

          <div className="footer-contact-item">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Gujarat, India</span>
          </div>
        </div>

      </div>


      {/* BOTTOM */}
      <div className="footer-bottom">

        <p>
          © 2026 Made with <span className="heart">❤️</span> by{" "}
          <span className="gupta">Sachin Gupta</span>
        </p>

        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>

      </div>

    </footer>
  )
}

export default Footer