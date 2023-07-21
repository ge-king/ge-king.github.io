import uniqid from 'uniqid'
import { resume } from '../../portfolio'
import ResumeContainer from '../ResumeContainer/ResumeContainer'
import './Resume.css'

const Resume = () => {
  if (!resume.length) return null

  return (
    <section id='resume__grid' className='section resume__grid'>
      <h2 className='section__title'>Experience</h2>

      <div className='resume__grid' id='resume'>
        {resume.map((resumeItem) => (
          <ResumeContainer key={uniqid()} resume={resumeItem} />
        ))}
      </div>
    </section>
  )
}

export default Resume
