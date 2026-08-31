import React, { useEffect, useState } from "react";
import "./Services.css";

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            number: "01",
            title: "Frontend Development",
            short:
                "Building responsive and interactive interfaces with clean, maintainable code.",
            description:
                "I build modern frontend experiences focused on responsive layouts, reusable components, smooth interactions and a clean user experience.",
            tags: ["React", "JavaScript", "HTML", "CSS"],
        },
        {
            number: "02",
            title: "Responsive Web Design",
            short:
                "Designing websites that feel natural across desktop, tablet and mobile.",
            description:
                "I create flexible layouts that adapt to different screen sizes while keeping the interface consistent, readable and easy to use.",
            tags: ["Responsive UI", "CSS", "Flexbox", "Grid"],
        },
        {
            number: "03",
            title: "Interactive Experiences",
            short:
                "Adding thoughtful motion and interactions that make interfaces feel alive.",
            description:
                "From hover states to scroll-based reveals and subtle transitions, I focus on interactions that improve the experience without becoming distracting.",
            tags: ["Animations", "Interactions", "Scroll Effects", "UI"],
        },
        {
            number: "04",
            title: "UI Implementation",
            short:
                "Turning designs and ideas into polished, functional web interfaces.",
            description:
                "I translate visual ideas into working interfaces with attention to spacing, typography, responsiveness and the small details that make a design feel complete.",
            tags: ["UI", "React", "Components", "Pixel Detail"],
        },
    ];

    // =====================================================
    // MODAL
    // =====================================================

    const openModal = (service) => {
        setSelectedService(service);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = "";
    };

    // =====================================================
    // ESC KEY
    // =====================================================

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <>
            <section id="services" className="services">

                {/* ================= HEADER ================= */}

                <div className="services-header">

                    <div className="services-label">
                        <span></span>
                        02 — WHAT I DO
                    </div>

                    <div className="services-heading-wrap">

                        <h2>
                            I build things
                            <span> people use.</span>
                        </h2>

                        <p>
                            From clean interfaces to interactive
                            experiences, I focus on making the web
                            feel simple, useful and enjoyable.
                        </p>

                    </div>

                </div>


                {/* ================= SERVICE LIST ================= */}

                <div className="services-list">

                    {services.map((service) => (
                        <button
                            type="button"
                            className="service-item"
                            key={service.number}
                            onClick={() => openModal(service)}
                        >

                            <span className="service-number">
                                {service.number}
                            </span>

                            <div className="service-main">

                                <h3>
                                    {service.title}
                                </h3>

                                <p>
                                    {service.short}
                                </p>

                                <div className="service-tags">

                                    {service.tags
                                        .slice(0, 3)
                                        .map((tag) => (
                                            <span key={tag}>
                                                {tag}
                                            </span>
                                        ))}

                                </div>

                            </div>

                            <span className="service-arrow">
                                ↗
                            </span>

                        </button>
                    ))}

                </div>


                {/* ================= BOTTOM ================= */}

                <div className="services-bottom">

                    <span></span>

                    <p>
                        IDEAS → INTERFACE → EXPERIENCE
                    </p>

                    <span></span>

                </div>

            </section>


            {/* =================================================
                MODAL
            ================================================= */}

            {selectedService && (
                <div
                    className="service-modal-overlay"
                    onClick={closeModal}
                >

                    <div
                        className="service-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            className="service-modal-close"
                            onClick={closeModal}
                            aria-label="Close service details"
                        >
                            ×
                        </button>

                        <span className="modal-number">
                            {selectedService.number}
                        </span>

                        <h2>
                            {selectedService.title}
                        </h2>

                        <p className="modal-description">
                            {selectedService.description}
                        </p>

                        <div className="modal-tags">
                            {selectedService.tags.map((tag) => (
                                <span key={tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="modal-done"
                            onClick={closeModal}
                        >
                            Got it
                            <span>↗</span>
                        </button>

                    </div>

                </div>
            )}
        </>
    );
};

export default Services;