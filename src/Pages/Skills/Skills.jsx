import React, { useState, useEffect } from "react";
import { FaCode, FaServer, FaDatabase, FaTools, FaReact, FaSass } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../ErrorModal/ErrorModal";
import "./Skills.scss";
import "../../App.scss";

const Skills = ({ showSidebar, active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); 
  }, []);

  const skillsData = [
    { id: 1, icon: <FaCode />, name: "Frontend Development", description: "Proficient in HTML, CSS, JavaScript, and React.js to build responsive and interactive UIs." },
    { id: 2, icon: <FaServer />, name: "Backend Development", description: "Experienced with Node.js, Express.js, and API development to power web applications." },
    { id: 3, icon: <FaDatabase />, name: "Database Management", description: "Skilled in working with SQL and NoSQL databases like MySQL and MongoDB." },
    { id: 4, icon: <FaTools />, name: "DevOps & Tools", description: "Familiar with CI/CD pipelines, Docker, and various development tools for automation." },
    { id: 5, icon: <FaReact />, name: "React & State Management", description: "Expert in React.js with state management tools like Redux, Context API, and hooks." },
    { id: 6, icon: <FaSass />, name: "Styling & CSS Preprocessors", description: "Proficient in Sass/SCSS for creating maintainable and scalable stylesheets." },
  ];

  return (
    <div className="skills">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="skills_container">
        <Navbar showSidebar={showSidebar} />

        <div className="skills_content">
          {loading && (
            <div className="overlay">
              <FaCode className="loading-spinner" />
            </div>
          )}

          <h2>My Skills</h2>
          <div className="skills_list">
            {skillsData.map((skill) => (
              <div key={skill.id} className="skill_card">
                <div className="skill_icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        

        {errorModalOpen && <Error errorMessage={errorMessage} isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />}
      </div>
    </div>
  );
};

export default Skills;
