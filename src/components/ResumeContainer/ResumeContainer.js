import uniqid from 'uniqid';
import LaunchIcon from '@material-ui/icons/Launch';
import { useEffect, useRef } from 'react';
import './ResumeContainer.css';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import Atropos from 'atropos';
// eslint-disable-next-line import/no-unresolved
import 'atropos/css';

const ResumeContainer = ({ resume }) => {
  const atroposRef = useRef(null);

  useEffect(() => {
    // Initialize Atropos
    const atroposInstance = Atropos({
      el: atroposRef.current,
      rotateXMax: 3,
      rotateYMax: 3,
      highlight: false,
      shadow: false,
      rotateTouch: 'scroll-y',
    });

    // Cleanup
    return () => {
      atroposInstance.destroy();
    };
  }, []);

  useEffect(() => {
    // Your existing effect for background update
    const updateBackground = (e) => {
      document.documentElement.style.setProperty('--x', `${e.pageX}px`);
      document.documentElement.style.setProperty('--y', `${e.pageY}px`);
    };

    window.addEventListener('mousemove', updateBackground);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateBackground);
    };
  }, []);

  return (
    <Link to={resume.website} className="resume-link">
      <div ref={atroposRef} className="atropos my-atropos">
        <div className="atropos-scale">
          <div className="atropos-rotate">
            <div className="atropos-inner resume">
            <img 
                src={resume.image}
                alt="CV"
                className="resume-image-container"
            />
              {/* Resume content */}
              <div className="resume-header">
                <div className="role-and-company">
                  <h1 className="resume-role">{resume.role}</h1>
                  <p className="resume-company">{resume.company}</p>
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
  
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
  
};

export default ResumeContainer;
