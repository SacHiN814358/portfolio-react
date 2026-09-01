import { useEffect, useState } from "react";
import "./navbar.css";
import { useTheme } from "../../context/ThemeContext";
import logoWhite from "../../assets/logo-whitee.png";
import logoBlack from "../../assets/logo-blackk.png";

const Navbar = () => {
    const { isLight } = useTheme();
    const [menu, setMenu] = useState("home");
    const [open, setOpen] = useState(false);

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
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offset = navbarHeight + 25;

        window.scrollTo({
            top: Math.max(0, elementPosition - offset),
            behavior: "smooth",
        });
    };

    // =====================================================
    // ACTIVE SECTION HIGHLIGHT
    // =====================================================

    useEffect(() => {
        const sections = [
            { id: "home",     name: "home"     },
            { id: "about",    name: "about"    },
            { id: "skills",   name: "skills"   },
            { id: "services", name: "services" },
            { id: "work",     name: "work"     },
            { id: "contact",  name: "contact"  },
        ];

        const handleScroll = () => {
            const triggerPoint = window.innerHeight * 0.35;
            let currentSection = "home";

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i].id);
                if (!element) continue;
                const rect = element.getBoundingClientRect();
                if (rect.top <= triggerPoint) {
                    currentSection = sections[i].name;
                    break;
                }
            }

            setMenu(currentSection);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // =====================================================
    // MENU CLICK
    // =====================================================

    const handleMenuClick = (event, id, menuName) => {
        event.preventDefault();
        scrollToSection(id, menuName);
    };

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <>
            {/* ================================================= NAVBAR ================================================= */}

            <nav className="navbar">

                {/* LOGO */}
                <a
                    href="#home"
                    className="nav-logo-link"
                    onClick={(e) => handleMenuClick(e, "home", "home")}
                >
                    <img
                        className="nav-logo"
                        src={isLight ? logoWhite : logoBlack}
                        alt="Sachin"
                    />
                </a>

                {/* MENU */}
                <ul className={`navmenu ${open ? "active" : ""}`}>

                    <li className={menu === "home" ? "active" : ""}>
                        <a href="#home" onClick={(e) => handleMenuClick(e, "home", "home")}>HOME</a>
                    </li>

                    <li className={menu === "about" ? "active" : ""}>
                        <a href="#about" onClick={(e) => handleMenuClick(e, "about", "about")}>ABOUT</a>
                    </li>

                    <li className={menu === "services" ? "active" : ""}>
                        <a href="#services" onClick={(e) => handleMenuClick(e, "services", "services")}>SERVICES</a>
                    </li>

                    <li className={menu === "work" ? "active" : ""}>
                        <a href="#work" onClick={(e) => handleMenuClick(e, "work", "work")}>WORK</a>
                    </li>

                    <li className={menu === "contact" ? "active" : ""}>
                        <a href="#contact" onClick={(e) => handleMenuClick(e, "contact", "contact")}>CONTACT</a>
                    </li>

                </ul>

                {/* LET'S TALK */}
                <a
                    href="#contact"
                    className="nav-connect"
                    onClick={(e) => handleMenuClick(e, "contact", "contact")}
                >
                    <span>LET'S TALK</span>
                    <span className="nav-arrow">↗</span>
                </a>

                {/* HAMBURGER */}
                <button
                    type="button"
                    className={`hamburger ${open ? "open" : ""}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={open}
                >
                    <span></span>
                    <span></span>
                </button>

            </nav>
        </>
    );
};

export default Navbar;
