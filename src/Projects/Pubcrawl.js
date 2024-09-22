import React, { useState } from 'react';
import './Project.css';
import uniqid from 'uniqid';
import LaunchIcon from '@material-ui/icons/Launch'

const Pubcrawl = () => {
    const [projectInfo, setProjectInfo] = useState({
        title: 'Crawl.Pub',
        headlineImageUrl: '/images/crawlpub.png',
        url: 'https://crawl.pub/',
        stack: ['Javascript', 'CSS', 'React.JS','HTML','Netlify'],
    });

    return (
        <div className="main-container">
            <img 
                src={projectInfo.headlineImageUrl}
                alt="Headline"
                className="headline-image"
            />
            <div className="title-container">
                <h2 className="title-heading">{projectInfo.title}</h2> 
                <a
        href={projectInfo.url}
        aria-label='live preview'
        className='link link--icon'
        style={{ display: 'inline-block', marginLeft: '15px', position: 'relative', top: '0.15em' }}
      >
        <LaunchIcon />
      </a>
                {projectInfo.stack && (
                    <ul className='project__stack_page'>
                      {projectInfo.stack.map((item) => (
                        <li key={uniqid()} className='project__stack_page-item'>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )} 
            </div>
            <p style={{ marginBottom: '10px' }}>Crawl.pub is a web application I developed to offer a practical solution for organizing pub crawls. Built with React, its core functionality allows users to plan their pub route by selecting from a list of pubs, after which the app generates a navigable route using the Google Maps API. The project was an exercise in creating a responsive and interactive user interface that works smoothly across both mobile and desktop devices. Handling the map&apos;s integration was a key part of the development process, requiring careful attention to API documentation and understanding the nuances of map-based interactivity.</p>
            <p style={{ marginBottom: '10px' }}>The back-end of Crawl.pub is supported by Google Firestore, which I utilized for its real-time data storage capabilities. This choice was crucial for maintaining the dynamic nature of the app, allowing pub crawl routes to be saved and retrieved efficiently. The Firestore integration also enabled the feature of rearranging pubs in the planned route, adding flexibility to the user experience. This aspect of the project challenged my skills in database management and deepened my understanding of working with cloud-based storage solutions.</p>
            <p style={{ marginBottom: '10px' }}>Finally, Crawl.pub&apos;s deployment on Netlify reflects my focus on reliability and ease of access. The platform was chosen for its compatibility with React applications and its straightforward deployment process. A notable feature of Crawl.pub is the ability to share pub crawl plans with friends via unique URLs, a function that emphasizes the app’s social sharing aspect. This project not only honed my technical skills in full-stack development but also provided insight into the practical aspects of creating applications that cater to specific user needs in a real-world context.</p>
            
        </div>

        
    );
};

export default Pubcrawl;

