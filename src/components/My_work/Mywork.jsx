import "./Mywork.css";
import workGraphic from "../../assets/work-graphic.svg";
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

                    <div className="mywork-heading-text">
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

                    <div className="mywork-visual">
                        <img src={workGraphic} alt="Showcase illustration" />
                    </div>

                </div>

            </div>


            {/* ================= PROJECTS GRID ================= */}

            <div className="mywork-grid">

                {mywork_data.map((work) => (

                    <article
                        className="work-card"
                        key={work.w_no}
                    >

                        {/* IMAGE CONTAINER */}

                        <div className="work-image">

                            <img
                                src={work.w_img}
                                alt={work.w_title}
                                loading="lazy"
                            />

                            {/* STATUS BADGE */}
                            <div className="work-status-badge">
                                {work.w_live ? (
                                    <span className="badge-pill badge-live">
                                        <span className="badge-pulse"></span>
                                        LIVE APP
                                    </span>
                                ) : (
                                    <span className="badge-pill badge-preview">
                                        <span className="badge-dot"></span>
                                        PREVIEW
                                    </span>
                                )}
                            </div>

                            {/* HOVER OVERLAY */}
                            <div className="work-image-overlay">

                                {work.w_live ? (
                                    <button
                                        className="view-live-overlay-btn"
                                        onClick={() =>
                                            openLink(work.w_live)
                                        }
                                    >
                                        <span>EXPLORE LIVE</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </button>
                                ) : (
                                    <span className="coming-soon">
                                        PROJECT PREVIEW
                                    </span>
                                )}

                            </div>

                        </div>


                        {/* INFO CONTAINER */}

                        <div className="work-info">

                            {/* TOP HEADER ROW: NUMBER + TITLE + ACTION ICONS */}
                            <div className="work-card-header">

                                <div className="work-title-group">
                                    <span className="work-number">
                                        {String(work.w_no).padStart(2, "0")}
                                    </span>
                                    <h3 className="work-title">
                                        {work.w_title}
                                    </h3>
                                </div>

                                <div className="work-links">
                                    {work.w_live && (
                                        <button
                                            className="work-btn-icon"
                                            onClick={() =>
                                                openLink(work.w_live)
                                            }
                                            aria-label="Live Demo"
                                            title="Live Demo"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </button>
                                    )}

                                    {work.w_github && (
                                        <button
                                            className="work-btn-icon"
                                            onClick={() =>
                                                openLink(work.w_github)
                                            }
                                            aria-label="GitHub Repository"
                                            title="View GitHub Code"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                            </svg>
                                        </button>
                                    )}

                                    {!work.w_live && !work.w_github && (
                                        <span className="work-placeholder" title="In Development">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </span>
                                    )}
                                </div>

                            </div>

                            {/* DESCRIPTION */}
                            <p className="work-desc">
                                {work.w_name}
                            </p>

                            {/* TECH STACK */}
                            <div className="work-tech">
                                {work.w_tech.map((tech) => (
                                    <span key={tech} className="tech-tag">
                                        {tech}
                                    </span>
                                ))}
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

                <a
                    href="https://github.com/SacHiN814358"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="more-projects-link"
                >
                    SEE MORE ON GITHUB
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </a>

                <div className="mywork-bottom-line">
                    <span></span>
                    <span></span>
                </div>

            </div>

        </section>
    );
};

export default Mywork;