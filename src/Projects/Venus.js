import React, { useState } from 'react';
import './Project.css';
import uniqid from 'uniqid';

const Venus = () => {
    const [projectInfo] = useState({
        title: 'Simulation of the aerocapture of a probe around Venus',
        headlineImageUrl: '/images/venus.png',
        stack: ['MATLAB', 'Engineering'],
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
            <p className="info-paragraph">In a university project, I was solely in charge of coding and simulating the aerocapture of a spacecraft around Venus using MATLAB. This responsibility involved developing the MATLAB code to accurately model the spacecraft&apos;s trajectory based on ordinary differential equations, derived from an understanding of the spacecraft&apos;s dynamics and the environmental conditions of Venus.</p>
            <p className="info-paragraph">My focus was on ensuring the computational aspects of the project were robust and precise. Additionally, I was responsible for creating visualizations and a user-friendly graphical user interface (GUI) in MATLAB. These elements were crucial for effectively demonstrating the spacecraft&apos;s trajectory and the mechanics of aerocapture for entering Venus&apos; orbit.</p>
            <p className="info-paragraph">A significant part of my work included extending the simulation to depict the spacecraft&apos;s transition from an elliptical to a stable circular orbit around Venus. The success of this extension showcased the spacecraft&apos;s ability to achieve and maintain a stable orbit, as demonstrated by the detailed simulations I conducted.</p>
            <p className="info-paragraph">This project was an intensive exercise in applying theoretical principles of aerodynamics and orbital mechanics in a practical setting. It allowed me to enhance my MATLAB programming skills, particularly in creating simulations that were not only technically sound but also visually engaging, emphasizing the importance of clear and effective communication in scientific research.</p>
        </div>
    );
};

export default Venus;
