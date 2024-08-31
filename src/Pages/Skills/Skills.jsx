import React, { useState, useEffect, useCallback } from "react";
import { FaCode, FaServer, FaDatabase, FaTools, FaReact, FaSass } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../ErrorModal/ErrorModal";
import SkillDetailsModal from "../SkillDetailsModal/SkillDetailsModal"; // Import the modal component
import axios from "axios";
import "./Skills.scss";
import "../../App.scss";

const Skills = ({ showSidebar, active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null); // State to track the selected skill
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    fetchSkills();
  }, []);

  const skillsData = [
    { id: 1, icon: <FaCode />, percentage: 90 },
    { id: 2, icon: <FaServer />, percentage: 85 },
    { id: 3, icon: <FaDatabase />, percentage: 80 },
    { id: 4, icon: <FaTools />, percentage: 75 },
    { id: 5, icon: <FaReact />, percentage: 70 },
    { id: 6, icon: <FaSass />, percentage: 95 },
  ];

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://profitpilot.ddns.net/Data/v1/skills');

      if (response.status === 200) {
        const fetchedData = response.data.Data;
        
        const mappedData = fetchedData.map(skill => {
      
          const icon = skillsData.find(s => s.id === skill.id)?.icon || null;
          const percentage = skillsData.find(s => s.id === skill.id)?.percentage || 0;
          return { ...skill, icon, percentage };
        });
        setData(mappedData);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
        setErrorModalOpen(true);
      } else {
        setErrorMessage("Failed to fetch data. Please try again.");
        setErrorModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

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
              <div key={skill.id} className="skill_card" onClick={() => handleSkillClick(skill)}>
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
        {selectedSkill && (
          <SkillDetailsModal
            skill={selectedSkill}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Skills;
