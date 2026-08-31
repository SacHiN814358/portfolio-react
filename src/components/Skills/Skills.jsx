import React from "react";
import "./Skills.css";

const Skills = () => {
    const skillGroups = [
        {
            number: "01",
            title: "CORE",
            description:
                "The technologies I use to build modern frontend interfaces.",
            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
            ],
        },

        {
            number: "02",
            title: "BUILD",
            description:
                "Tools and approaches I use to structure and build projects.",
            skills: [
                "Responsive Design",
                "Reusable Components",
                "Git",
                "GitHub",
            ],
        },

        {
            number: "03",
            title: "EXPLORING",
            description:
                "Technologies I’m currently exploring and improving.",
            skills: [
                "Next.js",
                "Advanced React",
                "Modern UI",
                "Web Interactions",
            ],
        },
    ];


    return (
        <section id="skills" className="skills">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="skills-header">

                <div className="skills-label">
                    <span></span>
                    03 — MY TOOLKIT
                </div>

                <div className="skills-heading-wrap">

                    <h2>
                        Tools I use to
                        <span> build.</span>
                    </h2>

                    <p>
                        A growing collection of technologies,
                        tools and skills I use to turn ideas
                        into working web experiences.
                    </p>

                </div>

            </div>


            {/* =================================================
                SKILL GROUPS
            ================================================= */}

            <div className="skills-list">

                {skillGroups.map((group) => (
                    <div
                        className="skill-group"
                        key={group.number}
                    >

                        {/* NUMBER */}

                        <div className="skill-group-number">
                            {group.number}
                        </div>


                        {/* CONTENT */}

                        <div className="skill-group-content">

                            <div className="skill-group-info">

                                <h3>
                                    {group.title}
                                </h3>

                                <p>
                                    {group.description}
                                </p>

                            </div>


                            {/* SKILL TAGS */}

                            <div className="skills-grid">

                                {group.skills.map(
                                    (skill, index) => (
                                        <div
                                            className="skill-card"
                                            key={skill}
                                        >

                                            <span className="skill-index">
                                                {String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <span className="skill-name">
                                                {skill}
                                            </span>

                                            <span className="skill-arrow">
                                                ↗
                                            </span>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>
                ))}

            </div>


            {/* =================================================
                BOTTOM
            ================================================= */}

            <div className="skills-bottom">

                <span></span>

                <p>
                    ALWAYS LEARNING. ALWAYS BUILDING.
                </p>

                <span></span>

            </div>

        </section>
    );
};

export default Skills;