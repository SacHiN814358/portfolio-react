import React, { useEffect, useState } from 'react'
import './Footer.css'

import logoWhite from '../../assets/logo-whitee.png'
import logoBlack from '../../assets/logo-blackk.png'

import user_icon from '../../assets/user_icon.svg'

const Footer = () => {

    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const [loading, setLoading] = useState(false)

    // Check current theme from body
    const [isLight, setIsLight] = useState(
        document.body.classList.contains('light-theme')
    )

    useEffect(() => {

        const observer = new MutationObserver(() => {
            setIsLight(
                document.body.classList.contains('light-theme')
            )
        })

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()

    }, [])


    const handleSubscribe = () => {

        if (!email.trim()) {
            alert('Please enter your email 📧')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email 📧')
            return
        }

        setLoading(true)

        setTimeout(() => {

            setLoading(false)
            setSubscribed(true)
            setEmail('')

            setTimeout(() => {
                setSubscribed(false)
            }, 3000)

        }, 1000)
    }


    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }


    return (

        <div className='footer'>

            {/* ================= TOP ================= */}

            <div className="top">

                <div className="top-left">

                    {/* Theme based logo */}
                    <img
                        src={isLight ? logoWhite : logoBlack}
                        alt="Sachin Logo"
                    />

                    <p>
                        I’m a frontend developer who enjoys building modern,
                        responsive and user-friendly web experiences.
                    </p>

                </div>


                {/* ================= EMAIL ================= */}

                <div className="top-right">

                    <div className="email_input">

                        <img
                            src={user_icon}
                            alt=""
                        />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading || subscribed}
                        />

                    </div>


                    {/* ================= SUBSCRIBE ================= */}

                    <div
                        className={`subscribe ${
                            subscribed ? 'subscribed' : ''
                        }`}
                        onClick={handleSubscribe}
                    >

                        {loading
                            ? 'Subscribing...'
                            : subscribed
                            ? '✓ Subscribed!'
                            : 'Subscribe'
                        }

                    </div>

                </div>

            </div>


            {/* ================= DIVIDER ================= */}

            <hr />


            {/* ================= BOTTOM ================= */}

            <div className="bottom">

                <p className='bottom-left'>
                    All Rights Reserved
                </p>


                <div className="bottom-right">

                    <p>
                        Term of Services
                    </p>

                    <p>
                        Privacy Policy
                    </p>

                    <p
                        onClick={() => {
                            document
                                .getElementById('contactt')
                                ?.scrollIntoView({
                                    behavior: 'smooth'
                                })
                        }}
                    >
                        Connect With Me
                    </p>

                    <p
                        className="back-top"
                        onClick={scrollToTop}
                    >
                        ↑ Back to Top
                    </p>

                </div>

            </div>

        </div>

    )
}

export default Footer