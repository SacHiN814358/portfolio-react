import Navbar from "./components/NAVBAR/navbar"
import Hero from "./components/hero/hero"
import About from "./components/About/About"
import Services from "./components/Services/Services"
import Mywork from "./components/My_work/Mywork.jsx"
import Contact from "./components/Contact/Contact.jsx"
import Footer from "./components/Footer/Footer.jsx"
import CustomCursor from "./components/CustomCursor/CustomCursor"
import Skills from "./components/Skills/Skills"
import ScrollReveal from "./components/ScrollReveal/ScrollReveal"

const App = () => {
  return (
    <div>
      <CustomCursor />
      <Navbar />
      <Hero />

      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal>
        <Skills />
      </ScrollReveal>

      <ScrollReveal>
        <Services />
      </ScrollReveal>

      <ScrollReveal>
        <Mywork />
      </ScrollReveal>

      <ScrollReveal>
        <Contact />
      </ScrollReveal>

      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </div>
  )
}

export default App