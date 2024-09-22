import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import { ThemeContext } from '../../contexts/theme'
import { projects, skills, contact, resume } from '../../portfolio'
import './Navbar.css'


const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext)
  const [showNavList, setShowNavList] = useState(false)
  const location = useLocation();
  const projectPageNames = ['mach', 'crawl', 'aiblog']; // Add all project page names here
  const isOnProjectPage = projectPageNames.some(name => location.pathname.includes(name));
  console.log(location.pathname, isOnProjectPage)
  const toggleNavList = () => setShowNavList(!showNavList)

  return (
    <nav className='center nav'>
      <ul
        style={{ display: showNavList ? 'flex' : null }}
        className='nav__list'
      >
        {resume.length ? (
          <li className='nav__list-item'>
            <a
              href={isOnProjectPage ? "http://georgeking.uk/#resume" : "#resume"}
              onClick={toggleNavList}
              className='link link--nav'
            >
              CV
            </a>
          </li>
        ) : null}
		
		{projects.length ? (
          <li className='nav__list-item'>
            <a
              href={isOnProjectPage ? "http://georgeking.uk/#projects" : "#projects"}
              onClick={toggleNavList}
              className='link link--nav'
            >
              Projects
            </a>
          </li>
        ) : null}

        {skills.length ? (
          <li className='nav__list-item'>
            <a
              href={isOnProjectPage ? "http://georgeking.uk/#skills" : "#skills"}
              onClick={toggleNavList}
              className='link link--nav'
            >
              Skills
            </a>
          </li>
        ) : null}

        {contact.email ? (
          <li className='nav__list-item'>
            <a
              href={isOnProjectPage ? "http://georgeking.uk/#contact" : "#contact"}
              onClick={toggleNavList}
              className='link link--nav'
            >
              Contact
            </a>
          </li>
        ) : null}
      </ul>

      <button
        type='button'
        onClick={toggleTheme}
        className='btn--icon nav__theme'
        aria-label='toggle theme'
      >
        {themeName === 'dark' ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}
      </button>

      <button
        type='button'
        onClick={toggleNavList}
        className='btn--icon nav__hamburger'
        aria-label='toggle navigation'
      >
        {showNavList ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  )
}

export default Navbar
