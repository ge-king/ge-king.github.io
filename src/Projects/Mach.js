import React, { useState } from 'react';
import './Project.css';
import uniqid from 'uniqid';
import LaunchIcon from '@material-ui/icons/Launch'

const Mach = () => {
    const [projectInfo, setProjectInfo] = useState({
        title: 'The Mach Initiative',
        headlineImageUrl: '/images/machheader.png',
        url: 'https://themachinitiative.com/',
        stack: ['Aerospace', 'MATLAB', 'Webflow', 'Design'],
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
            <p style={{ marginBottom: '10px' }}>As the Aircraft Structures Lead for the Mach Initiative, a student-led organization aiming to develop the world&apos;s fastest remote-control aircraft, my role was multifaceted, encompassing both technical and marketing aspects. My primary responsibility was the development of a MATLAB tool suite designed to optimize composite skin thickness and layup. This involved the application of various composite structure and failure theories to ensure the structural integrity and performance of the aircraft. I also conducted thorough structural failure analysis using Ansys, which was crucial for understanding and mitigating potential weaknesses in the aircraft&apos;s design.</p>
            <p style={{ marginBottom: '10px' }}>In addition to these technical responsibilities, I played a significant role in the marketing and design aspects of the initiative. I was instrumental in overhauling the branding strategy, giving the project a more cohesive and professional appearance. This effort extended to a complete redesign of the project&apos;s website, which I rebuilt from scratch, enhancing both its visual appeal and user experience.</p>
            <p style={{ marginBottom: '10px' }}>Between February and June 2023, as a part of my third-year aerospace project, I worked with a team of seven to build the initial concept from scratch. The development of a MATLAB structural tool suite was a highlight, where I devised a novel analytical method akin to the panel method. This method was specifically tailored for estimating buckling loads on high-speed UAVs with fibreglass delta wings. My approach was validated using Ansys composite pre-post, leading to the creation of an internal structure that incorporated materials like MDF, aluminium, titanium, and carbon fibre. In close collaboration with the technical integrator, I was responsible for designing the entire airframe, a contribution that earned me a strong First.</p>
            <p style={{ marginBottom: '10px' }}>In my final year, the project has progressed to the construction phase, with a focus on fabricating the aircraft&apos;s body parts from fibreglass. This hands-on phase has provided a practical application for my academic work. My final year project involves advancing the finite element modelling of fibreglass, incorporating a neural net model at the micro-scale. This aspect of the project not only complements my studies but also contributes directly to the Mach Initiative, linking theoretical concepts with real-world engineering challenges.</p>
            <p style={{ marginBottom: '10px' }}>In addition to my technical contributions, as the Marketing Lead for the Mach Initiative, I&apos;ve been steering our outreach efforts, particularly through our YouTube channel. This platform has become a vital tool for sharing our progress and engaging with a broader audience. Our channel has successfully garnered over 100,000 views and has attracted more than 2,000 subscribers.</p>
            
        </div>

        
    );
};

export default Mach;
