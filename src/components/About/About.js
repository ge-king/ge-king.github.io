import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import { about } from '../../portfolio'
import './About.css'

const About = () => {
  const { role, description, social, image } = about

  return (
    <div className='about center'>

      {role && <h2 className='about__role'>A {role}.</h2>}
      <div className='about__desc__and__img'>
        <p className='about__desc'>
          {description}
        </p>
        {image && (
        <img src={image} alt="Your Name" className="about__image" />
      )}
      </div>

      <div className='about__contact center'>
        

        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label='github'
                className='link link--icon'
              >
                <GitHubIcon />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label='linkedin'
                className='link link--icon'
              >
                <LinkedInIcon />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default About
