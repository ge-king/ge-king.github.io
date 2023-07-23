import { useContext, useEffect } from 'react'
import { ThemeContext } from './contexts/theme'
import Header from './components/Header/Header'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Resume from './components/Resume/Resume'
import Skills from './components/Skills/Skills'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './App.css'



const App = () => {
  const [{ themeName }] = useContext(ThemeContext)

  useEffect(() => {
    const updateBackground = (e) => {
      document.documentElement.style.setProperty('--x', `${e.pageX}px`)
      document.documentElement.style.setProperty('--y', `${e.pageY}px`)
    }

    window.addEventListener('mousemove', updateBackground)

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('mousemove', updateBackground)
    }
  }, [])

  return (
    <div id='top' className={`${themeName} app`}>
      <Header />

      <main>
        <About />
		<Resume />
        <Projects />
		
        <Skills />
        <Contact />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}


export default App
