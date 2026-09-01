import { useEffect, useState } from "react";
import "./hero.css";
import DeveloperAvatar from "./DeveloperAvatar";

const Hero = () => {
    const words = [
        "A React Developer",
        "A Frontend Developer",
        "A Web Developer",
    ];

    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        const speed = isDeleting ? 55 : 90;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setText(currentWord.substring(0, text.length + 1));
                if (text === currentWord) {
                    setTimeout(() => setIsDeleting(true), 1200);
                }
            } else {
                setText(currentWord.substring(0, text.length - 1));
                if (text === "") {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex]);

    return (
        <section id="home" className="hero">

            {/* Background decoration */}
            <div className="hero-glow hero-glow-one"></div>
            <div className="hero-glow hero-glow-two"></div>

            <div className="hero-content">

                {/* LEFT SIDE */}
                <div className="hero-left">

                    <div className="hero-eyebrow">
                        <span className="eyebrow-line"></span>
                        HELLO, I AM
                    </div>

                    <h1>
                        Sachin
                        <span className="hero-name"> Gupta.</span>
                    </h1>

                    <div className="hero-role">
                        <span className="role-label">I AM</span>
                        <span className="typing-text">
                            {text}
                            <span className="cursor">|</span>
                        </span>
                    </div>

                    <p className="hero-description">
                        I build modern, responsive and interactive web experiences
                        with clean interfaces and thoughtful details.
                    </p>

                    <div className="hero-actions">

                        <a href="#work" className="hero-primary">
                            <span>VIEW MY WORK</span>
                            <span className="hero-arrow">↗</span>
                        </a>

                        <a href="#contact" className="hero-secondary">
                            <span>LET'S TALK</span>
                            <span className="hero-arrow">↗</span>
                        </a>

                    </div>

                    <div className="hero-scroll">
                        <span className="scroll-line"></span>
                        <span>SCROLL TO EXPLORE</span>
                        <span className="scroll-arrow">↓</span>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="hero-right">

                    <DeveloperAvatar />

                    <div className="hero-location">
                        <span className="location-dot"></span>
                        BASED IN INDIA
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;
