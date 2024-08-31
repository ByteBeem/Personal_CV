import React, { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaSpinner } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Projects.scss";

const Projects = ({ showSidebar, active, closeSidebar }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch projects
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          name: "Portfolio Website",
          description: "A personal portfolio to showcase my work.",
          githubLink: "https://github.com/username/portfolio",
          liveDemoLink: "https://username.github.io/portfolio",
          icon: <FaGithub className="project_icon" />,
        },
        {
          id: 2,
          name: "E-commerce Platform",
          description: "A full-stack e-commerce platform with payment integration.",
          githubLink: "https://github.com/username/e-commerce",
          liveDemoLink: "https://ecommerce.example.com",
          icon: <FaExternalLinkAlt className="project_icon" />,
        },
        // Add more projects as needed
      ]);
      setLoading(false);
    }, 1000); 
  }, []);

  return (
    <div className="projects">
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="projects_container">
        <Navbar showSidebar={showSidebar} />
        <div className="projects_content">
          <h2>My Projects</h2>
          {loading ? (
            <div className="overlay">
              <FaSpinner className="loading-spinner" />
            </div>
          ) : (
            <div className="projects_list">
              {projects.map((project) => (
                <div className="project_card" key={project.id}>
                  {project.icon}
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project_links">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="icon" /> GitHub
                    </a>
                    <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="icon" /> Live Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="footer">
          <p>© 2024 Your Name. All rights reserved.</p>
          <p>Check out my work on GitHub or view live demos!</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
