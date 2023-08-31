const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://georgeking.uk',
  title: 'GK',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'George King',
  description:
    `Hi! I'm an aspiring Financial Software Engineer, currently studying in my final year of a MEng Aerospace Engineering at the University of Bath. Current Software Intern at Callen-Lenz.`,
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
    name: 'AI Blogger',
    description:
      'An automated blogging tool, using the OpenAI GPT API and Wordpress HTTP API to automatically generate and post blog posts on any topic. Allows for thousands of blog posts to be generated, including royalty free image sourcing and implementation, rich articles, meta generation, auto tagging, SEO. GUI currently written in tkinter, moving to React.',
    stack: ['Python', 'HTTP', 'AI', 'GUI'],
    sourceCode: 'https://github.com/ge-king/ai_blog',
  },
    {
    name: 'The Mach Initiative',
    description:
      'The Mach Initiative, a student-run body started in 2022, aims to build the worlds fastest remote-control plane. As structural lead, I devised a unique approach to minimize weight in a fibreglass composite skin delta wing facing large forces, which were verified in Ansys ACP. I rebranded the project and developed the website.',
    stack: ['Aerospace', 'MATLAB', 'Webflow','Design'],
    livePreview: 'https://themachinitiative.com',
  },
  {
    name: 'crawl.pub',
    description:
      'Design your own custom pub crawl, and plan it out on a map. Designed and built in React.JS, using the Google Maps API and the Google Places API. Deployed on Netlify. Save and share your crawl - backend using Firestore DB.',
    stack: ['Javascript', 'CSS', 'React.JS','HTML','Netlify'],
    livePreview: 'https://crawl.pub',
  },
  {
    name: 'Yikes! Zombies! Run! 3',
    description:
      `The third installment in the YZR game series. The first two games were developed in Monkey X, by my father Tom. It's time for YZR3! This game is currently being written in the awesome open-source Godot. Play a (very early) version below!`,
    stack: ['Godot', 'GdScript', 'HTML'],
    sourceCode: 'https://github.com/ge-king/yzr3',
    livePreview: 'https://georgeking.uk/yzr3/HTML/yzr3.html',
  },
  {
    name: 'cv-generator',
    description:
      'Ongoing project. A simple CV generator, written in Rust. Will generate a LaTeX CV from a simple JSON file. Currently in development, but will be available on crates.io when complete.',
    stack: ['Rust','LaTeX','JSON','CLI'],
    sourceCode: 'https://github.com/ge-king/ProjectOrbital',
  },
  {
    name: 'Various Python Projects',
    description:
      `Various Python projects I've dabbled in, ranging from photo EXIF removers to Github readme generators to asymmetric cyphers. Take a look!`,
    stack: ['Python'],
    sourceCode: 'https://github.com/ge-king',
  },

]


const resume = [
	{
    company: 'Callen-Lenz',
    role: 'Software Engineering Intern',
	dates: 'June 2023 - September 2023',
    description: 'Intern in the software team at Callen-Lenz, a market-leading UK SME delivering operationally proven capabilities, bespoke platforms, rapid prototyping and avionics, as well as complementary technical consultancy for uncrewed and crewed aviation.',
	skills: ['Rust', 'Python', 'Git', 'Agile', 'Jira', 'C#'],
	website: 'https://callenlenz.com',
  },
  
  {
    company: 'The Mach Initiative',
    role: 'Aerospace Structures, Marketing and Web Development',
	dates: 'January 2023 - Ongoing',
    description: "Aircraft Structures Lead for the Mach Initiative. The Mach Initiative is a student-run organisation, with the goal of developing the world's fastest remote-control aircraft. Secondary role of Marketing & Design. \n- Built MATLAB tool suite to determine ideal composite skin thickness and layup, using various composite structure and failure theories. \n- Performed in-depth structural failure analysis in Ansys. \n- Produced a complete structural design in CAD. \n- Comprehensively overhauled branding strategy. \n- Redesigned website from the ground up.",
	skills: ['MATLAB', 'Python', 'Aerospace', 'LaTeX', 'Ansys', 'Blender', 'DaVinci Resolve', 'Webflow'],
	website: 'https://www.themachinitiative.com/',
  },
  
  {
    company: '3P innovation Ltd.',
    role: 'Engineering Intern',
	dates: 'August 2021 - August 2022',
    description: "- Detailed design and 3D CAD modelling of industrial machines for pharmaceutical use.\n- Member of multiple design teams, with experience designing core machine modules (web handling system for a £1M+ machine, machine-device interface for similar large project).\n- Built and ran proof-of-concept rigs, analysing data and presenting information to design teams.\n- Worked with multiple large international clients, under strict NDA.\n- Analysed large datasets from standard machines with a variety of placebos and drugs, informing various projects on the compatibility of powders with 3P’s standard filling technologies.\n- Liaised with international clients\n- Involved in update of company’s COSHH (Control of Substances Hazardous to Health) guidelines.",
	skills: ['Autodesk Suite', 'Excel', 'Data Analysis', 'Technical Drawing', 'Presentation', 'Mechanical Engineering'],
	website: 'https://3pinnovation.com',
  },
  
  {
    company: 'University of Bath',
    role: 'Aerospace Engineering MEng',
	dates: 'September 2019 - July 2024',
    description: '- Currently studying at first-class level. \n- Final year modules:\n  - Final year project (potentially high-speed UAV digital twin design.) \n  - Heat transfer \n  - System modelling and simulation \n  - Business processes \n  - Advanced helicopter dynamics \n  - Spacecraft engineering ',
	skills: ['MATLAB', 'Python', 'Aerospace', 'LaTeX', 'Ansys', 'Blender', 'DaVinci Resolve', 'Webflow'],
	website: 'https://bath.ac.uk',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'Rust',
  'Python',
  'C#',
  'C',
  'MATLAB',
  'Javascript',
  'React',
  'Git',
  'Jira',
  'Agile',
  'LaTeX',
  'CLI',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'georgepking@gmail.com',
}

export { header, about, resume, projects, skills, contact }
