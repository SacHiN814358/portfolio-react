import React, { useState } from 'react'
import './Services.css'


const Services = () => {

    const [selectedSkill, setSelectedSkill] = useState(null)


    const skillSections = [

        {
            number: "01",
            title: "CORE",
            description:
                "The technologies I use to build modern frontend interfaces.",

            skills: [
                {
                    number: "01",
                    name: "HTML",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                    description:
                        "The standard markup language I use to structure modern web pages."
                },

                {
                    number: "02",
                    name: "CSS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                    description:
                        "I use CSS to create responsive layouts, animations and polished user interfaces."
                },

                {
                    number: "03",
                    name: "JavaScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                    description:
                        "I use JavaScript to add logic, interactivity and dynamic functionality to websites."
                },

                {
                    number: "04",
                    name: "React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                    description:
                        "I use React to build reusable, interactive and scalable frontend components."
                }
            ]
        },


        {
            number: "02",
            title: "BUILD",
            description:
                "Tools and approaches I use to structure and build projects.",

            skills: [
                {
                    number: "01",
                    name: "Responsive Design",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                    description:
                        "I create layouts that work smoothly across mobile, tablet and desktop devices."
                },

                {
                    number: "02",
                    name: "Reusable Components",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                    description:
                        "I build reusable components to keep projects clean, scalable and easy to maintain."
                },

                {
                    number: "03",
                    name: "Git",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                    description:
                        "I use Git for version control and to manage changes throughout my projects."
                },

                {
                    number: "04",
                    name: "GitHub",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
                    description:
                        "I use GitHub to store, manage and collaborate on my development projects."
                }
            ]
        },


        {
            number: "03",
            title: "EXPLORING",
            description:
                "Technologies I’m currently exploring and improving.",

            skills: [
                {
                    number: "01",
                    name: "Next.js",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                    description:
                        "I am exploring Next.js to build faster and more scalable React applications."
                },

                {
                    number: "02",
                    name: "Advanced React",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                    description:
                        "I am improving my React knowledge through advanced patterns, state management and performance optimization."
                }
            ]
        }

    ]


    const openModal = (skill) => {
        setSelectedSkill(skill)
    }


    const closeModal = () => {
        setSelectedSkill(null)
    }


    return (

        <div className="services" id="services">


            {/* =====================================================
               HEADER
            ===================================================== */}

            <div className="services-header">

                <div className="services-label">
                    <span></span>
                    SKILLS
                </div>


                <div className="services-heading-wrap">

                    <h2>
                        WHAT I<br />
                        WORK WITH
                    </h2>

                    <p>
                        A focused set of technologies and tools
                        I use to design, build and improve
                        modern web experiences.
                    </p>

                </div>

            </div>



            {/* =====================================================
               SKILL SECTIONS
            ===================================================== */}

            <div className="services-sections">

                {skillSections.map((section, sectionIndex) => (

                    <div
                        className="services-section"
                        key={sectionIndex}
                    >


                        {/* LEFT SIDE */}

                        <div className="services-section-info">

                            <span className="section-number">
                                {section.number}
                            </span>


                            <div className="section-content">

                                <h3>
                                    {section.title}
                                </h3>

                                <p>
                                    {section.description}
                                </p>

                            </div>

                        </div>



                        {/* RIGHT SIDE */}

                        <div className="services-list">

                            {section.skills.map((skill) => (

                                <button
                                    className="service-item"
                                    key={skill.number}
                                    onClick={() => openModal(skill)}
                                >


                                    {/* NUMBER */}

                                    <span className="service-number">
                                        {skill.number}
                                    </span>



                                    {/* MAIN */}

                                    <div className="service-main">

                                        <h3>
                                            {skill.name}
                                        </h3>

                                    </div>



                                    {/* ICON */}

                                    <div className="service-icon">

                                        <img
                                            src={skill.icon}
                                            alt=""
                                        />

                                    </div>



                                    {/* ARROW */}

                                    <span className="service-arrow">
                                        ↗
                                    </span>


                                </button>

                            ))}

                        </div>

                    </div>

                ))}

            </div>



            {/* =====================================================
               BOTTOM
            ===================================================== */}

            <div className="services-bottom">

                <span></span>

                <p>
                    HOVER TO EXPLORE
                </p>

            </div>



            {/* =====================================================
               MODAL
            ===================================================== */}

            {selectedSkill && (

                <div
                    className="service-modal-overlay"
                    onClick={closeModal}
                >

                    <div
                        className="service-modal"
                        onClick={(e) => e.stopPropagation()}
                    >


                        {/* CLOSE */}

                        <button
                            className="service-modal-close"
                            onClick={closeModal}
                        >
                            ×
                        </button>



                        {/* ICON */}

                        <div className="modal-icon">

                            <img
                                src={selectedSkill.icon}
                                alt=""
                            />

                        </div>



                        {/* NUMBER */}

                        <span className="modal-number">
                            {selectedSkill.number}
                        </span>



                        {/* TITLE */}

                        <h2>
                            {selectedSkill.name}
                        </h2>



                        {/* DESCRIPTION */}

                        <p className="modal-description">
                            {selectedSkill.description}
                        </p>



                        {/* BUTTON */}

                        <button
                            className="service-modal-button"
                            onClick={closeModal}
                        >
                            CLOSE
                        </button>

                    </div>

                </div>

            )}

        </div>

    )
}


export default Services