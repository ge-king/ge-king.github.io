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
    `Hi, I'm George King. I'm a Graduate Software Engineer at Ocado Technology, currently working in data science and trying to predict customer behaviour. On this site you can find my past experience, projects, and education.`,
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
      'Student-led project aiming to build the world’s fastest RC plane. I led structural design, branding, and built the website.',
    stack: [ 'MATLAB', 'Webflow','Design'],
    category: 'Uni',
    sourceCode: 'mach',
    livePreview: 'https://themachinitiative.com',
    image: '/images/machheader.png',
  },
]


const resume = [
  {
    company: 'Ocado Technology',
    role: 'Software Engineering Graduate 💻',
	dates: 'September 2024 - Present',
  description: `Graduate engineer at Ocado Technology.

  - Currently working in data science, trying to predict customer behaviour.
  - Previously built and maintained Java backend code in a monolithic system.
  - Previously developed vision-based robot control using diffusion models.`,
  skills: [
    'Java', 'Spring Boot', 'AWS',
    'Python', 'PyTorch',
    'Machine Learning', 'Data Science', 'Vertex AI'
  ],
	website: 'https://ocadogroup.com',
  image: '/images/ocado.png',
  },
	{
    company: 'Callen-Lenz',
    role: 'Software Engineering Intern 💻',
	dates: 'June 2023 - September 2023',
  description: `- Built a standalone Rust tool interfacing with proprietary hardware via WebSocket.
- Integrated tool into C# ground control software.
- Fixed critical bugs across avionics software.`,
  skills: ['Rust', 'Python', 'Git', 'Agile', 'Jira', 'C#'],
	website: 'https://callenlenz.com',
  image: '/images/callen.png',
  },
  
  {
    company: 'The Mach Initiative',
    role: 'Aerospace Structures, Web Dev ✈️',
	dates: 'January 2023 - September 2024',
  description: `- Developed MATLAB tools to optimize composite layups using failure theories.
- Ran structural simulations in Ansys and delivered full CAD design.
- Rebranded the initiative and rebuilt the website from scratch.`,
  	skills: ['MATLAB', 'Python', 'Aerospace', 'LaTeX', 'Ansys', 'Blender', 'DaVinci Resolve', 'Webflow'],
	website: 'https://www.themachinitiative.com/',
  image: '/images/mach.png',
  },
  
  {
    company: '3P innovation Ltd.',
    role: 'Engineering Intern ⚙️',
	dates: 'August 2021 - August 2022',
  description: `- Designed and modelled pharmaceutical machines in Autodesk Inventor.
- Built and tested proof-of-concept rigs, presenting results to stakeholders.
- Led design of web handling system for £1M+ device.
- Analysed datasets to assess powder compatibility with filling tech.
- Updated COSHH compliance and worked with NDA clients globally.`,
	skills: ['Autodesk Suite', 'Excel', 'Data Analysis', 'Technical Drawing', 'Presentation', 'Mechanical Engineering'],
	website: 'https://3pinnovation.com',
  image: '/images/3p.png',
  },
  
  {
    company: 'University of Bath',
    role: 'MEng Aerospace Engineering',
    dates: '2019 – 2024',
    description: `- First-Class Honours graduate.
- Awarded Armourers and Brasiers Prize for best materials project.
- Dissertation: Developed a multiscale FE² framework using deep neural networks as mesoscale
 surrogates for woven composite simulation.`,
    skills: ['MATLAB', 'Python', 'FE²', 'Composites', 'LaTeX', 'Ansys'],
    website: 'https://bath.ac.uk',
    image: '/images/bath.png',
  }
  
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'Python',
  'PyTorch',
  'Java',

  'Git',
  'Jira',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'george@georgeking.uk',
}

export { header, about, resume, projects, skills, contact }
