const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://georgeking.uk',
  title: 'GK',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'George King',
  image: '/images/profile.png',
  description:
    `Hi! I'm a Gradute Software Engineer at Ocado Technology, in the machine learning team. On this site you can find my past experience, projects, and education.`,
  resume: 'https://example.com',
  social: {
    linkedin: 'https://linkedin.com/in/ge-king',
    github: 'https://github.com/ge-king',
  },
}


const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'The Mach Initiative',
    description:
      'The Mach Initiative, a student-run body started in 2022, aims to build the worlds fastest remote-control plane. I led the structural development, branding, and website design.',
    stack: [ 'MATLAB', 'Webflow','Design'],
    category: 'Uni',
    sourceCode: 'mach',
    livePreview: 'https://themachinitiative.com',
    image: '/images/machheader.png',
  },

  {
    name: 'Crawl.Pub',
    description:
      'Design your own custom pub crawl, and plan it out on a map. Designed and built in React.JS, using the Google Maps API and the Google Places API. Deployed on Netlify. Save and share your crawl!',
    stack: [ 'React', 'CSS','HTML','Netlify'],
    sourceCode: 'pubcrawl',
    category: 'Personal',
    image: '/images/crawlpub.png',
  },

  {
    name: 'MapDate',
    description:
      'Answer questions to figure out exactly when your weird map was made! Built in React, using Mapbox GL JS, deployed on Vercel, with Python backend on Heroku.',
    stack: [ 'React', 'CSS','Python','Vercel','Heroku'],
    sourceCode: 'https://mapdater.vercel.app/',
    category: 'Personal',
    image: '/images/mapdate.png',
  },

  {
    name: 'AI Blogger',
    description:
      'An automated blogging tool, using the OpenAI GPT API and Wordpress HTTP API to automatically generate and post blog posts on any topic.',
    stack: ['Python', 'HTTP', 'AI', 'GUI'],
    sourceCode: 'aiblog',
    category: 'Personal',
    image: '/images/aiblog.png',
  },
    
  {
    name: 'Yikes! Zombies! Run! 3',
    description:
      `The third installment in the YZR series. The first two were developed by my father Tom. It's time for YZR3! This game is currently being written in the open-source Godot. Play a (very early) version!`,
    stack: ['Godot', 'GdScript', 'HTML'],
    category: 'Personal',
    sourceCode: 'https://georgeking.uk/yzr3/HTML/yzr3.html',
    image: '/images/yzr.png',
  },
  {
    name: 'Various Python Projects',
    description:
      `Various Python projects I've dabbled in, ranging from photo EXIF removers to Github readme generators to asymmetric cyphers. Take a look!`,
    stack: ['Python'],
    category: 'Personal',
    sourceCode: 'https://github.com/ge-king',
    image: '/images/various.png',
  },
  {
    name: 'Modelling of a Space Shuttle Heatshield Tile',
    description:
      `The MATLAB modelling of heat transfer through a tile from a Space Shuttle's heatshield, during re-entry. Uses various finite difference methods to solve the heat equation.`,
    stack: [ 'MATLAB'],
    category: 'Uni',
    sourceCode: 'shuttle',
    image: '/images/shuttle.png',
  },
  {
    name: 'Simulation of probe aerocapture around Venus',
    description:
      `Simulation in MATLAB of a probe being captured into orbit around Venus, using an aerocapture manoeuvre. Uses decomposed differential equations to solve quickly. Also simulates a circularisation burn.`,
    stack: [ 'MATLAB'],
    category: 'Uni',
    sourceCode: 'venus',
    image: '/images/venus.png',
  },
  {
    name: 'Analytical Design of a hat-stiffened CFRP panel',
    description:
      `This project involved the analytical design of a hat-stiffened CFRP composite wing panel for a fictional passenger aircraft undergoing a particular load-case.`,
    stack: [ 'MATLAB'],
    category: 'Uni',
    sourceCode: 'wing',
    image: '/images/wing.png',
  },


]


const resume = [
  {
    company: 'Ocado Technology',
    role: 'Software Engineering Graduate 💻',
	dates: 'September 2024 - current',
    description: 'Software Engineering graduate at Ocado Technology, aiming to disrupt the way the world shops with advanced technology.\n- Currently in the machine learning research team',
	skills: ['Machine Learning', 'Python', 'Google Cloud', 'Big Data', 'Pipelines', 'SQL'],
	website: 'https://ocadogroup.com',
  image: '/images/ocado.png',
  },
	{
    company: 'Callen-Lenz',
    role: 'Software Engineering Intern 💻',
	dates: 'June 2023 - September 2023',
    description: 'Intern in the software team at Callen-Lenz, a market-leading UK SME delivering operationally proven capabilities, bespoke platforms, rapid prototyping and avionics, as well as complementary technical consultancy for uncrewed and crewed aviation.\n- Designed a standalone Rust-based program to interface with proprietary hardware over Websocket \n- Integrated into the company\'s flagship C# product\n- Fixed multiple bugs across ground control software',
	skills: ['Rust', 'Python', 'Git', 'Agile', 'Jira', 'C#'],
	website: 'https://callenlenz.com',
  image: '/images/callen.png',
  },
  
  {
    company: 'The Mach Initiative',
    role: 'Aerospace Structures, Marketing and Web Development ✈️',
	dates: 'January 2023 - Ongoing',
    description: "Aircraft Structures Lead for the Mach Initiative. The Mach Initiative is a student-run organisation, with the goal of developing the world's fastest remote-control aircraft. Secondary role of Marketing & Design. \n- Built MATLAB tool suite to determine ideal composite skin thickness and layup, using various composite structure and failure theories. \n- Performed in-depth structural failure analysis in Ansys. \n- Produced a complete structural design in CAD. \n- Comprehensively overhauled branding strategy. \n- Redesigned website from the ground up.",
	skills: ['MATLAB', 'Python', 'Aerospace', 'LaTeX', 'Ansys', 'Blender', 'DaVinci Resolve', 'Webflow'],
	website: 'https://www.themachinitiative.com/',
  image: '/images/mach.png',
  },
  
  {
    company: '3P innovation Ltd.',
    role: 'Engineering Intern ⚙️',
	dates: 'August 2021 - August 2022',
    description: "- Detailed design and 3D CAD modelling of industrial machines for pharmaceutical use.\n- Member of multiple design teams, with experience designing core machine modules (web handling system for a £1M+ machine, machine-device interface for similar large project).\n- Built and ran proof-of-concept rigs, analysing data and presenting information to design teams.\n- Worked with multiple large international clients, under strict NDA.\n- Analysed large datasets from standard machines with a variety of placebos and drugs, informing various projects on the compatibility of powders with 3P’s standard filling technologies.\n- Liaised with international clients\n- Involved in update of company’s COSHH (Control of Substances Hazardous to Health) guidelines.",
	skills: ['Autodesk Suite', 'Excel', 'Data Analysis', 'Technical Drawing', 'Presentation', 'Mechanical Engineering'],
	website: 'https://3pinnovation.com',
  image: '/images/3p.png',
  },
  
  {
    company: 'University of Bath',
    role: 'Aerospace Engineering MEng 👨‍🎓',
	dates: 'September 2019 - July 2024',
    description: '- Graduated with First-Class Honours. \n- Armourers and Brasiers Award for Best Materials Project\n- Dissertation: An FE^2 Multiscale Approach using Deep Neural Networks as Surrogates for Mesoscale Simulations in Woven Composites ',
	skills: ['MATLAB', 'Python', 'Aerospace', 'LaTeX', 'Ansys', 'Blender', 'DaVinci Resolve', 'Webflow'],
	website: 'https://bath.ac.uk',
  image: '/images/bath.png',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'Rust',
  'Python',
  'C#',
  'MATLAB',
  'Javascript',
  'React',
  'Git',
  'Jira',
  'Agile',
  'LaTeX',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'georgepking@gmail.com',
}

export { header, about, resume, projects, skills, contact }
