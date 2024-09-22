import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ThemeContext } from './contexts/theme';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';
import Skills from './components/Skills/Skills';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Mach from './Projects/Mach'; 
import Pubcrawl from './Projects/Pubcrawl';
import Aiblog from './Projects/Aiblog';
import Shuttle from './Projects/Shuttle';
import Venus from './Projects/Venus';
import Wing from './Projects/Wing';


import './App.css';

const App = () => {
  const [{ themeName }] = useContext(ThemeContext);

  useEffect(() => {
    const updateBackground = (e) => {
      document.documentElement.style.setProperty('--x', `${e.pageX}px`);
      document.documentElement.style.setProperty('--y', `${e.pageY}px`);
    };

    window.addEventListener('mousemove', updateBackground);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('mousemove', updateBackground);
    };
  }, []);

  return (
    <Router>
      <div id='top' className={`${themeName} app`}>
        <Header />

        <Routes>
          {/* Define routes for each project */}
          <Route path="/mach" element={<Mach />} />
          <Route path="/pubcrawl" element={<Pubcrawl />} />
          <Route path="/aiblog" element={<Aiblog />} />
          <Route path="/shuttle" element={<Shuttle />} />
          <Route path="/venus" element={<Venus />} />
          <Route path="/wing" element={<Wing />} />
          

          {/* Default route */}
          <Route path="/" element={
            <main>
              <About />
              <Resume />
              <Projects />
              <Skills />
              <Contact />
            </main>
          }/>
        </Routes>

        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
