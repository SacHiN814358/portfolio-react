import React from "react";
import "./Mywork.css";
import mywork_data from "../../assets/mywork_data";

const Mywork = () => {

    const openLink = (link) => {
        if (!link) return;

        window.open(
            link,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <section id="work" className="mywork">

            {/* ================= HEADER ================= */}

            <div className="mywork-header">

                <div className="mywork-label">
                    <span></span>
                    04 — SELECTED WORK
                </div>

                <div className="mywork-heading-wrap">

                    <h2>
                        Things I've
                        <span> built.</span>
                    </h2>

                    <p>
                        A collection of experiments,
                        interfaces and projects I'm building
                        while growing as a frontend developer.
                    </p>

                </div>

            </div>


            {/* ================= PROJECTS ================= */}

            <div className="mywork-grid">

                {mywork_data.map((work) => (

                    <article
                        className="work-card"
                        key={work.w_no}
                    >

                        {/* IMAGE */}

                        <div className="work-image">

                            <img
                                src={work.w_img}
                                alt={work.w_title}
                            />

                            <div className="work-image-overlay">

                                {work.w_live ? (
                                    <button
                                        onClick={() =>
                                            openLink(work.w_live)
                                        }
                                    >
                                        VIEW LIVE
                                        <span>↗</span>
                                    </button>
                                ) : (
                                    <span className="coming-soon">
                                        PROJECT PREVIEW
                                    </span>
                                )}

                            </div>

                        </div>


                        {/* INFO */}

                        <div className="work-info">

                            <div className="work-number">
                                {String(work.w_no).padStart(2, "0")}
                            </div>


                            <div className="work-content">

                                <h3>
                                    {work.w_title}
                                </h3>

                                <p>
                                    {work.w_name}
                                </p>


                                {/* TECH STACK */}

                                <div className="work-tech">

                                    {work.w_tech.map(
                                        (tech) => (
                                            <span key={tech}>
                                                {tech}
                                            </span>
                                        )
                                    )}

                                </div>

                            </div>


                            {/* LINKS */}

                            <div className="work-links">

                                {work.w_live && (
                                    <button
                                        onClick={() =>
                                            openLink(work.w_live)
                                        }
                                        aria-label="Live project"
                                    >
                                        ↗
                                    </button>
                                )}

                                {work.w_github && (
                                    <button
                                        onClick={() =>
                                            openLink(work.w_github)
                                        }
                                        aria-label="GitHub repository"
                                    >
                                        GH
                                    </button>
                                )}

                                {!work.w_live &&
                                    !work.w_github && (
                                        <span className="work-placeholder">
                                            ↗
                                        </span>
                                    )}

                            </div>

                        </div>

                    </article>

                ))}

            </div>


            {/* ================= BOTTOM ================= */}

            <div className="mywork-bottom">

                <div className="mywork-bottom-line">
                    <span></span>
                    <span></span>
                </div>

                <p>
                    MORE PROJECTS COMING SOON
                </p>

                <div className="mywork-bottom-line">
                    <span></span>
                    <span></span>
                </div>

            </div>

        </section>
    );
};

export default Mywork;