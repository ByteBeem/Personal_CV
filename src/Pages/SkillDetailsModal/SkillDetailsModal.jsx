import React, { useEffect, useState } from 'react';
import './SkillDetailsModal.scss';

const SkillDetailsModal = ({ skill, isOpen, onClose }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setPercentage(0); 
      let currentPercentage = 0;
      const interval = setInterval(() => {
        if (currentPercentage >= skill.percentage) {
          clearInterval(interval);
        } else {
          currentPercentage += 1;
          setPercentage(currentPercentage);
        }
      }, 20);
    }
  }, [isOpen, skill.percentage]);

  if (!isOpen) return null;

  return (
    <div className="skill-details-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Skill - rate</h2>
        <div className="bars">
          <div className="info">
            <span>{skill.name}</span>
            <span>{percentage}%</span>
          </div>
          <div className="line">
            <div className="progress" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default SkillDetailsModal;
