import { useState } from "react"
import "./DeveloperAvatar.css"
import devIdle from "../../assets/dev_idle.jpg"
import devWave from "../../assets/dev_wave.jpg"

const DeveloperAvatar = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={`dev-avatar-container ${isHovered ? "waving" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Pop-up Cyber Tag / Speech Bubble on Hover */}
            <div className={`avatar-speech-bubble ${isHovered ? "visible" : ""}`}>
                <span className="speech-wave">👋</span>
                <span className="speech-text">Hey! I'm Sachin!</span>
                <span className="speech-tag">&lt;dev /&gt;</span>
            </div>

            {/* Orbiting Tech Badges */}
            <div className="orbit-badge badge-react" title="React Specialist">
                <span>⚛️</span>
            </div>
            <div className="orbit-badge badge-code" title="Frontend Developer">
                <span>&lt;/&gt;</span>
            </div>
            <div className="orbit-badge badge-star" title="Fast & Interactive">
                <span>⚡</span>
            </div>

            {/* Ambient Back Glow */}
            <div className="avatar-backdrop-glow"></div>

            {/* Rotating Cyber Halo Ring */}
            <div className="avatar-cyber-ring"></div>

            {/* Live Status Pill */}
            <div className="avatar-status-pill">
                <span className="live-dot"></span>
                <span>OPEN TO WORK</span>
            </div>

            {/* 3D Glass Avatar Frame */}
            <div className="avatar-glass-card">
                {/* Idle Character Image */}
                <img
                    src={devIdle}
                    alt="Sachin - Developer Avatar"
                    className={`avatar-img avatar-idle ${isHovered ? "hidden" : "visible"}`}
                />

                {/* Waving Character Image (Revealed on Hover) */}
                <img
                    src={devWave}
                    alt="Sachin Waving"
                    className={`avatar-img avatar-waving ${isHovered ? "visible" : "hidden"}`}
                />
            </div>
        </div>
    )
}

export default DeveloperAvatar