import uniqid from 'uniqid'
import GitHubIcon from '@material-ui/icons/GitHub'
import LaunchIcon from '@material-ui/icons/Launch'
import { useContext, useEffect } from 'react'
import './ResumeContainer.css'

const ResumeContainer = ({ resume }) => {
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
    <div className='resume'>
      <div className="resume-header">
        <div className="role-and-company">
          <h1 className="resume-role">{resume.role}</h1>
          <p className="resume-company" href={resume.website}>{resume.company}</p>
        </div>
        <p className="resume-dates">{resume.dates}</p>
      </div>

      <h4 className="resume-name">{resume.name}</h4>
      <p className="resume-description">{resume.description}</p>

      {resume.skills && (
        <ul className='resume__skills'>
          {resume.skills.map((skill) => (
            <li key={uniqid()} className='resume__skills-item'>
              {skill}
            </li>
          ))}
        </ul>
      )}

      {resume.website && (
        <a
          href={resume.website}
          aria-label='website'
          className='link link--icon'
        >
          <LaunchIcon />
        </a>
      )}
    </div>
  )
}

export default ResumeContainer
