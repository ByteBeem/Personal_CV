import React, { useState, useEffect, useCallback } from "react";
import { FaCode, FaServer, FaDatabase, FaTools, FaReact, FaSass } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../ErrorModal/ErrorModal";
import axios from "axios";
import "./Skills.scss";
import "../../App.scss";

const Skills = ({ showSidebar, active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

 
  const skillsData = [
    { id: 1, icon: <FaCode /> },
    { id: 2, icon: <FaServer />},
    { id: 3, icon: <FaDatabase /> },
    { id: 4, icon: <FaTools />},
    { id: 5, icon: <FaReact /> },
    { id: 6, icon: <FaSass /> },
  ];

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://profitpilot.ddns.net/Data/v1/skills');

      if (response.status === 200) {
        const fetchedData = response.data.Data;
        
        const mappedData = fetchedData.map(skill => {
      
          const icon = skillsData.find(s => s.id === skill.id)?.icon || null;
          return { ...skill, icon };
        });
        setData(mappedData);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Failed to fetch data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

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
            {data.map(skill => (
              <div key={skill.id} className="skill_card">
                <div className="skill_icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
        {errorModalOpen && (
          <Error
            errorMessage={errorMessage}
            isOpen={errorModalOpen}
            onClose={() => setErrorModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Skills;
