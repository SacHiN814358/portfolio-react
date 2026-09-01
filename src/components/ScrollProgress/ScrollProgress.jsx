import { useEffect, useState } from 'react'
import './ScrollProgress.css'

const ScrollProgress = () => {

    const [progress, setProgress] = useState(0)

    useEffect(() => {

        const handleScroll = () => {

            const scrollTop = window.scrollY
            const documentHeight =
                document.documentElement.scrollHeight - window.innerHeight

            const scrollProgress =
                (scrollTop / documentHeight) * 100

            setProgress(scrollProgress)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    return (
        <div
            className="scroll-progress"
            style={{ width: `${progress}%` }}
        ></div>
    )
}

export default ScrollProgress