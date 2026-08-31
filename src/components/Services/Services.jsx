import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import './Services.css'
import skillSections from './services_data'


const Services = () => {

    const [selectedSkill, setSelectedSkill] = useState(null)


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
                        What<span> Work</span> I Do
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
               MODAL — Portal se render hota hai, document.body me
            ===================================================== */}

            {selectedSkill && createPortal(

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

                </div>,

                document.body

            )}

        </div>

    )
}


export default Services