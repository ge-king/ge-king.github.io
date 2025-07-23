import uniqid from 'uniqid'
import { Link } from 'react-router-dom'
import GitHubIcon from '@material-ui/icons/GitHub'
import LaunchIcon from '@material-ui/icons/Launch'
import { projects } from '../../portfolio'
import './Projects.css'

const Projects = () => {
  if (!projects.length) return null

  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Projects</h2>

      <div className='projects__list'>
        {projects.map((project) => (
          <div key={uniqid()} className='project__item'>
            <div className='project__header'>
              <div className='project__title-section'>
                <h3 className='project__name'>{project.name}</h3>
                <span className={`project__category project__category--${project.category?.toLowerCase()}`}>
                  {project.category?.toUpperCase()}
                </span>
              </div>
              <div className='project__links'>
                {project.sourceCode && project.sourceCode.startsWith('http') && (
                  <a 
                    href={project.sourceCode}
                    className='project__btn project__btn--github'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='View source code'
                  >
                    <GitHubIcon />
                    <span>GitHub</span>
                  </a>
                )}
                {project.sourceCode && !project.sourceCode.startsWith('http') && (
                  <Link 
                    to={project.sourceCode}
                    className='project__btn project__btn--details'
                  >
                    <span>View Details</span>
                  </Link>
                )}
                {project.livePreview && (
                  <a 
                    href={project.livePreview}
                    className='project__btn project__btn--website'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='View live website'
                  >
                    <LaunchIcon />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
            
            <p className='project__description'>{project.description}</p>
            
            <div className='project__tech-stack'>
              {project.stack?.map((tech) => (
                <span key={uniqid()} className='project__tech'>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
