import React, { useState } from 'react';
import './Project.css';
import uniqid from 'uniqid';

const Aiblog = () => {
    const [projectInfo] = useState({
        title: 'Automating Blog Content with AI',
        headlineImageUrl: '/images/aiblog.png',
        stack: ['Python', 'HTTP', 'AI', 'GUI'],
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
            <p className="info-paragraph">For my portfolio, I developed a proof-of-concept AI blogging tool, leveraging OpenAI&apos;s GPT-4 API and DALL-E 3 for content and image generation. This project was an exploration into the intersection of AI and content creation, built primarily in Python with a graphical user interface (GUI) implemented using PyTinker. It&apos;s important to note that this tool was designed for experimental purposes only and was tested on a private blog; I do not endorse its use for generating public content without proper oversight and ethical considerations.</p>
            <p className="info-paragraph">The core functionality of this tool revolves around using GPT-4 for generating blog articles on a wide range of topics. To ensure the content was both relevant and engaging, I employed advanced prompt engineering techniques. This involved carefully designing prompts that guide the AI to produce specific types of content, maintaining a balance between creativity and coherence. The integration with DALL-E 3 added another dimension to the blog posts, enabling the tool to create complementary images that enhanced the visual appeal and context of the written content.</p>
            <p className="info-paragraph">To streamline the process of publishing these AI-generated articles, I utilized the WordPress REST API. This allowed the tool to automatically upload each blog post to a WordPress site, showcasing the potential for automating content management workflows. The Python-based backend handled the API interactions, managing tasks like formatting the posts correctly and handling the metadata.</p>
            <p className="info-paragraph">Creating the GUI with PyTinker was a deliberate choice to make the tool user-friendly, allowing for easy customization of prompts and control over the publishing process. This project served as a valuable learning experience in integrating various APIs and technologies to create a fully functional application. It also highlighted the ethical considerations and responsibilities that come with leveraging AI in content creation, a reflection that&apos;s especially pertinent in today&apos;s rapidly evolving digital landscape.</p>
        </div>
    );
};

export default Aiblog;
