import "./Skills.css";

const Skills = () => {
    const skillGroups = [
        {
            number: "01",
            title: "CORE",
            description:
                "The technologies I use to build modern frontend interfaces.",
            skills: [
                {
                    name: "HTML",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                },
                {
                    name: "CSS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                },
                {
                    name: "JavaScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                },
                {
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                },
            ],
        },

        {
            number: "02",
            title: "BUILD",
            description:
                "Tools and approaches I use to structure and build projects.",
            skills: [
                {
                    name: "Responsive Design",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                },
                {
                    name: "Reusable Components",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                },
                {
                    name: "Git",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                },
                {
                    name: "GitHub",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                },
            ],
        },

        {
            number: "03",
            title: "EXPLORING",
            description:
                "Technologies I’m currently exploring and improving.",
            skills: [
                {
                    name: "Next.js",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                },
                {
                    name: "Advanced React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                },
                {
                    name: "Modern UI",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                },
                {
                    name: "Web Interactions",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                },
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

                                {group.skills.map((skill, index) => (
                                    <div
                                        className="skill-card"
                                        key={skill.name}
                                    >

                                        <span className="skill-index">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="skill-name">
                                            {skill.name}
                                        </span>

                                        {/* HOVER TECHNOLOGY ICON */}
                                        <div className="skill-icon">
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                            />
                                        </div>

                                        <span className="skill-arrow">
                                            ↗
                                        </span>

                                    </div>
                                ))}

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