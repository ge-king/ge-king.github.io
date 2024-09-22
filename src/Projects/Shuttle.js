import React, { useState } from 'react';
import './Project.css';
import uniqid from 'uniqid';

const Shuttle = () => {
    const [projectInfo] = useState({
        title: 'Modelling of Heat Transfer in Space Shuttle Heatshield Tile',
        headlineImageUrl: '/images/shuttle.png',
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
            <p className="info-paragraph">In a university project, I worked on simulating the heat flux through a spacecraft&apos;s heatshield tile during re-entry. The goal was to better understand how heat transfers through spacecraft materials in high-temperature environments. Using MATLAB, I explored both implicit and explicit methods to solve the heat equation in one dimension, considering specific boundary conditions that are relevant to space travel..</p>
            <p className="info-paragraph">A significant part of the project was developing user-friendly interfaces in MATLAB, which made analyzing complex data more approachable. Another key feature was creating a function to automatically extract data from temperature-time plot images, enhancing the efficiency and accuracy of our analysis.</p>
            <p className="info-paragraph">The project provided insights into the optimal thickness for the heatshield tile, a key factor in spacecraft design under thermal stress. Through this project, I gained valuable experience in applying mathematical models to practical problems and in simplifying complex data for more effective analysis.</p>
        </div>
    );
};

export default Shuttle;
