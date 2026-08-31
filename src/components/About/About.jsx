import React from "react";
import "./About.css";

const About = () => {
    return (
        <section id="About" className="about">

            {/* ================= HEADER ================= */}

            <div className="about-header">

                <div className="about-label">
                    <span></span>
                    01 — ABOUT ME
                </div>

                <h2>
                    More than just
                    <span> code.</span>
                </h2>

            </div>


            {/* ================= MAIN CONTENT ================= */}

            <div className="about-content">

                {/* ================= LEFT ================= */}

                <div className="about-intro">

                    <p className="about-lead">
                        I’m Sachin, a frontend developer who enjoys
                        turning ideas into modern and interactive
                        websites.
                    </p>

                    <p>
                        I love creating clean designs that look great
                        and work smoothly across different devices.
                        I’m currently focused on improving my skills
                        in React, JavaScript and modern web development
                        while building projects that help me grow
                        as a developer.
                    </p>

                </div>


                {/* ================= RIGHT ================= */}

                <div className="about-details">

                    {/* FRONTEND */}

                    <div className="about-detail">

                        <span className="detail-number">
                            01
                        </span>

                        <div className="detail-content">

                            <h3>FRONTEND</h3>

                            <p>
                                Building clean and responsive
                                interfaces with modern frontend
                                technologies.
                            </p>

                            <div className="tech-list">
                                <span>HTML</span>
                                <span>CSS</span>
                                <span>JavaScript</span>
                                <span>React</span>
                            </div>

                        </div>

                    </div>


                    {/* APPROACH */}

                    <div className="about-detail">

                        <span className="detail-number">
                            02
                        </span>

                        <div className="detail-content">

                            <h3>MY APPROACH</h3>

                            <p>
                                I care about clean layouts, smooth
                                interactions and making websites
                                enjoyable to use.
                            </p>

                        </div>

                    </div>


                    {/* LEARNING */}

                    <div className="about-detail">

                        <span className="detail-number">
                            03
                        </span>

                        <div className="detail-content">

                            <h3>CURRENTLY LEARNING</h3>

                            <p>
                                Continuously improving my React and
                                JavaScript skills while exploring
                                modern web development.
                            </p>

                            <div className="tech-list">
                                <span>React</span>
                                <span>JavaScript</span>
                                <span>Next.js</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= BOTTOM ================= */}

            <div className="about-bottom">

                <span className="about-bottom-line"></span>

                <p>
                    BUILDING. LEARNING. IMPROVING.
                </p>

                <span className="about-bottom-line"></span>

            </div>

        </section>
    );
};

export default About;