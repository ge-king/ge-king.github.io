import React, { useEffect, useRef } from 'react';
import uniqid from 'uniqid';
import GitHubIcon from '@material-ui/icons/GitHub';
import LaunchIcon from '@material-ui/icons/Launch';
import './ProjectContainer.css';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import Atropos from 'atropos';
// eslint-disable-next-line import/no-unresolved
import 'atropos/css';

const ProjectContainer = ({ project }) => {
  const atroposRef = useRef(null);

  useEffect(() => {
    const atroposInstance = Atropos({
      el: atroposRef.current,
      rotateXMax: 5, // Adjust as needed
      rotateYMax: 5, // Adjust as needed
      highlight: false,
      shadow: false,
      rotateTouch: 'scroll-y',
    });

    return () => {
      atroposInstance.destroy();
    };
  }, []);

  const getCategoryClassName = (category) => 
    category === 'Uni' ? 'project-category uni' : 'project-category personal';

  return (
    <Link to={project.sourceCode} className="project-link">
      <div ref={atroposRef} className="atropos my-atropos-project">
        <div className="atropos-scale">
          <div className="atropos-rotate">
            <div className="atropos-inner project">
            <div className={getCategoryClassName(project.category)}>
                {project.category}
              </div>
              {project.stack && (
                <ul className='project__stack'>
                  {project.stack.map((item) => (
                    <li key={uniqid()} className='project__stack-item'>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            <img 
                src={project.image}
                alt="Headline"
                className="project-image"
            />
            <div className="project__interior">
              <div className="project__title">{project.name}</div>
              
              <p className='project__description'>{project.description}</p>
              
            </div>
          </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectContainer;
