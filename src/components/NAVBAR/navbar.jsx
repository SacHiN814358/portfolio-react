import React, { useEffect, useState } from "react";
import "./navbar.css";

import logoWhite from "../../assets/logo-whitee.png";
import logoBlack from "../../assets/logo-blackk.png";

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const [open, setOpen] = useState(false);
    const [isLight, setIsLight] = useState(false);

    // =====================================================
    // THEME
    // =====================================================

    useEffect(() => {
        document.body.classList.toggle("light-theme", isLight);

        return () => {
            document.body.classList.remove("light-theme");
        };
    }, [isLight]);


    // =====================================================
    // SMOOTH SCROLL
    // =====================================================

    const scrollToSection = (id, menuName) => {
        const element = document.getElementById(id);

        if (!element) {
            console.warn(`Section with id "${id}" not found.`);
            return;
        }

        setMenu(menuName);
        setOpen(false);

        const navbar = document.querySelector(".navbar");

        const navbarHeight = navbar
            ? navbar.getBoundingClientRect().height
            : 0;

        const elementPosition =
            element.getBoundingClientRect().top +
            window.scrollY;

        const offset = navbarHeight + 25;

        window.scrollTo({
            top: Math.max(0, elementPosition - offset),
            behavior: "smooth",
        });
    };


    // =====================================================
    // ACTIVE SECTION
    // =====================================================

    useEffect(() => {
        const sections = [
            { id: "homee", name: "home" },
            { id: "About", name: "about" },
            { id: "services", name: "services" },
            { id: "work", name: "work" },
            { id: "contactt", name: "contact" },
        ];

        const handleScroll = () => {
            const triggerPoint =
                window.innerHeight * 0.35;

            let currentSection = "home";

            for (
                let i = sections.length - 1;
                i >= 0;
                i--
            ) {
                const element =
                    document.getElementById(
                        sections[i].id
                    );

                if (!element) continue;

                const rect =
                    element.getBoundingClientRect();

                if (rect.top <= triggerPoint) {
                    currentSection =
                        sections[i].name;

                    break;
                }
            }

            setMenu(currentSection);
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);


    // =====================================================
    // MENU CLICK
    // =====================================================

    const handleMenuClick = (
        event,
        id,
        menuName
    ) => {
        event.preventDefault();

        scrollToSection(
            id,
            menuName
        );
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (
        <>
            {/* =================================================
                NAVBAR
            ================================================= */}

            <nav className="navbar">

                {/* ================= LOGO ================= */}

                <a
                    href="#homee"
                    className="nav-logo-link"
                    onClick={(e) =>
                        handleMenuClick(
                            e,
                            "homee",
                            "home"
                        )
                    }
                >
                    <img
                        className="nav-logo"
                        src={
                            isLight
                                ? logoWhite
                                : logoBlack
                        }
                        alt="Sachin"
                    />
                </a>


                {/* ================= MENU ================= */}

                <ul
                    className={`navmenu ${
                        open ? "active" : ""
                    }`}
                >

                    {/* HOME */}

                    <li
                        className={
                            menu === "home"
                                ? "active"
                                : ""
                        }
                    >
                        <a
                            href="#homee"
                            onClick={(e) =>
                                handleMenuClick(
                                    e,
                                    "homee",
                                    "home"
                                )
                            }
                        >
                            HOME
                        </a>
                    </li>


                    {/* ABOUT */}

                    <li
                        className={
                            menu === "about"
                                ? "active"
                                : ""
                        }
                    >
                        <a
                            href="#About"
                            onClick={(e) =>
                                handleMenuClick(
                                    e,
                                    "About",
                                    "about"
                                )
                            }
                        >
                            ABOUT
                        </a>
                    </li>


                    {/* SERVICES */}

                    <li
                        className={
                            menu === "services"
                                ? "active"
                                : ""
                        }
                    >
                        <a
                            href="#services"
                            onClick={(e) =>
                                handleMenuClick(
                                    e,
                                    "services",
                                    "services"
                                )
                            }
                        >
                            SERVICES
                        </a>
                    </li>


                    {/* WORK */}

                    <li
                        className={
                            menu === "work"
                                ? "active"
                                : ""
                        }
                    >
                        <a
                            href="#work"
                            onClick={(e) =>
                                handleMenuClick(
                                    e,
                                    "work",
                                    "work"
                                )
                            }
                        >
                            WORK
                        </a>
                    </li>


                    {/* CONTACT */}

                    <li
                        className={
                            menu === "contact"
                                ? "active"
                                : ""
                        }
                    >
                        <a
                            href="#contactt"
                            onClick={(e) =>
                                handleMenuClick(
                                    e,
                                    "contactt",
                                    "contact"
                                )
                            }
                        >
                            CONTACT
                        </a>
                    </li>

                </ul>


                {/* ================= LET'S TALK ================= */}

                <a
                    href="#contactt"
                    className="nav-connect"
                    onClick={(e) =>
                        handleMenuClick(
                            e,
                            "contactt",
                            "contact"
                        )
                    }
                >
                    <span>LET'S TALK</span>

                    <span className="nav-arrow">
                        ↗
                    </span>
                </a>


                {/* ================= HAMBURGER ================= */}

                <button
                    type="button"
                    className={`hamburger ${
                        open ? "open" : ""
                    }`}
                    onClick={() =>
                        setOpen(!open)
                    }
                    aria-label="Toggle navigation menu"
                    aria-expanded={open}
                >
                    <span></span>
                    <span></span>
                </button>

            </nav>


            {/* =================================================
                THEME SWITCH
            ================================================= */}

            <button
                type="button"
                className={`theme-switch ${
                    isLight
                        ? "light"
                        : "dark"
                }`}
                onClick={() =>
                    setIsLight(!isLight)
                }
                aria-label="Toggle day and night mode"
            >
                <span className="switch-icon">
                    {isLight ? "☼" : "☾"}
                </span>

                <span className="switch-circle"></span>
            </button>
        </>
    );
};

export default Navbar;