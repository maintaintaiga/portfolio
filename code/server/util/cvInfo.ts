const skills = [
  {
    label: "Technologies",
    skills:
      "React, React Native, Expo, Node.JS, Express, Material UI, Yarn, Npm, ESLint, Babel, Webpack, Vue.JS, Next.JS, Redux",
  },
  { label: "Operating Systems", skills: "Unix, Linux, Windows" },
  {
    label: "Tools",
    skills: "Git, Jira, Docker, Ansible, Puppet, Logstash, Kibana, ELK Stack",
  },
  {
    label: "Development Platforms",
    skills: "VS Code, Nginx, Eclipse, Visual Studio, AWS, WordPress",
  },
  {
    label: "Computing Languages",
    skills:
      "Javascript, HTML5, CSS, Java, Shell Scripting, C++, XML, YAML, JSON, SQL",
  },
  {
    label: "Databases",
    skills:
      "MongoDB, Elasticsearch, Accumulo, Kafka, Zookeeper, SQLite, ArangoDB",
  },
];

const courses = [
  {
    label: "Ansible",
    description:
      "4 day course giving a comprehensive look at the software provisioning tool Ansible.",
  },
  {
    label: "MongoDB",
    description:
      "Various Mongo University courses, including MongoDB for Developers.",
  },
  {
    label: "Java 8",
    description: "Course covering new features as part of Java 8 release.",
  },
  {
    label: "ITIL Foundation Course",
    description:
      "IT Service Level course describing how to implement service based support within an organisation.",
  },
  { label: "Elasticsearch", description: "Online introductory course." },
  { label: "Accumulo", description: "Online introductory course." },
  {
    label: "Lean Startup",
    description:
      "Course describing ways of working. Including how to build on an initial idea in a cost effective way and how to analyse the results.",
  },
];

const education = [
  {
    label: "Master of Physics",
    location: "Swansea University",
    date: "2011 - 2015",
    description:
      "Masters Dissertation Project: I researched the use of String Theory in calculating the Inter-Quark Potential.",
  },
  {
    label: "A Level Qualifications",
    location: "Prudhoe Community High School",
    description: "Maths A, Physics C, Geography B",
    date: "June 2011",
  },
];

const experience = [
  {
    label: "Front End Developer (React App Project)",
    date: "September 2019 - Current",
    location: "Personal Project",
    description: `The project was created using CRA and employs modern React with functional components. Custom hooks were 
    utilized to produce reusable functionality such as theming, authorization, and permission requirements. 
    Many reusable components were crafted, including a table component based on Mui's Table. This table 
    component supports draggable columns, pagination, sorting, and searching columns. Additionally, an 
    editable table was built on top of the table component. Efforts were made to enhance the app's design and 
    feel, ensuring a fluid layout and utilizing the Mui Theme Provider. Axios was employed to facilitate API 
    calls, and collaboration with a backend Node.js developer was necessary. Rigorous testing, bug fixing, 
    and deployment to the production site, hosted on a Kamatera server, were also carried out.`,
  },
  {
    label: "Mobile Developer (React Native Project)",
    date: "September 2019 - Current",
    location: "Personal Project",
    description: `Project built with Expo. Worked with a node.js backend and a sqlite database.
     Developing an app that can be used to search vitamin content in food, and track daily 
     vitamin intake.`,
  },
  {
    label: "Database Administrator",
    date: "March 2017 - September 2019",
    location: "Civil Service - Full SC",
    description:
      "I was working in a database administrator role. We supported many systems and applications, making improvements to resiliency and monitoring, and dealing with incidents which often required quick thinking and implementing a solution to gain the best outcome. As part of this role I developed full stack applications for use by the support team working with react and NodeJS to develop the front-end and back-end of the application.",
  },
  {
    label: "Supermarket Assistant",
    date: "September 2015 - January 2017",
    location: "Waitrose Teignmouth, Lower Brook St., Teignmouth, Devon.",
    description:
      "I was working as a member of a team and also assisted other team members in completion of their work. I was given responsibility for training new employees. I assisted in the daily monitoring of company facilities.",
  },
  {
    label: "Data Cleaning Intern",
    date: "June 2013 - September 2013",
    location: "PII Pipeline Solutions (GE), Cramlington, Northumberland.",
    description: `I worked within the Maths and Software Department. The job involved data analysis, use of Excel macros and 
      using bespoke software. I worked with a team and had to adhere to strict deadlines with daily agile stand-ups.`,
  },
];

const additionalExperience = [
  {
    label: "Aikido Society Treasurer",
    date: "September 2012 & September 2013",
    location: "Swansea University.",
    description:
      "As treasurer of the society I was responsible for taking fees, producing receipts and managing petty cash.",
  },
  {
    label: "Shop Assistant",
    date: "June 2012 - September 2012",
    location: "British Heart Foundation (Retail Outlet), Consett.",
    description: "",
  },
];

const about = [
  `Since graduating from my physics degree course I have been interested in
establishing a career in software development and found employment which
allowed me to gain significant experience across a broad range of IT
projects. As a result, I have experience across the full development
stack using various technologies and am developing a career focussing on front end development.`,
  `I have also developed a Full Stack React application that is currently hosted at https://orchidana.com. This 
project involved the utilization of various technologies such as React, Node.js, and ArangoDB. 
I developed and deployed this app from scratch, which gave me a deeper understanding of the entire 
software development lifecycle. This project showcased my proficiency in creating dynamic user 
interfaces and implementing seamless user experiences.`,
];

const data = {
  skills,
  courses,
  education,
  experience,
  about,
  additionalExperience,
};

export { data };
