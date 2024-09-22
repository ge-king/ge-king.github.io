import React, { useState } from 'react';
import './Project.css';
import uniqid from 'uniqid';

const Wing = () => {
    const [projectInfo] = useState({
        title: 'Analytical design of a hat-stiffened CFRP composite panel for a wing structure',
        headlineImageUrl: '/images/wing.png',
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
            <p className="info-paragraph">In my university project, I took on the role of developing the coding and simulation for the design of an AB370 wing using MATLAB. This involved a comprehensive analysis of the wing structure of a fictional aircraft, focusing on the aerodynamic and structural forces acting on it during a 2.5g maneuver case.</p>
            <p className="info-paragraph">I was responsible for calculating the shear force, bending moment, and torque along the wing&apos;s semi-span. This task required a detailed understanding of the aerodynamic forces and weight distribution across the wing. The core of my work involved designing an idealized CFRP composite hat-stiffened panel for the wing, optimizing it for minimum mass while ensuring it could withstand various types of buckling and material failure under the ultimate load.</p>
            <p className="info-paragraph">To accomplish this, I developed MATLAB code to calculate the optimal dimensions and properties of the panel, ensuring all safety and performance criteria were met. The simulation and coding work I conducted were critical in determining the panel&apos;s final design, demonstrating its ability to withstand the specified loads.</p>
        </div>
    );
};

export default Wing;
