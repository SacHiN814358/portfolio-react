import { useEffect, useRef, useState } from "react";
import "./ScrollReveal.css";

const ScrollReveal = ({ children, className = "" }) => {

    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.12
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };

    }, []);

    return (
        <div
            ref={ref}
            className={`scroll-reveal ${visible ? "show" : ""} ${className}`}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;