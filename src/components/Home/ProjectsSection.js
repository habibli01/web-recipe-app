import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      title: "LinkedIn Data Extraction Chrome Extension",
      description: "A Chrome extension that helps extract LinkedIn profile data and automates form filling.",
      link: "https://github.com/yourusername/linkedin-extension",
      type: "GitHub Repository"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Web and Mobile Projects</h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
            >
              View {project.type}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection; 