import React from "react";
import "./InfoModal.scss";

const InfoModal = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="info-modal-overlay">
      <div className="info-modal">
        <div className="info-modal-header">
          <h2>Important Information</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="info-modal-content">
         
          <h3>Security</h3>
          <p>
            We take the privacy and security of your information seriously. Any personal information shared via this website is protected with industry-standard security measures.
          </p>

          <h3>Disclaimer</h3>
          <p>
            All content on this site, including personal details and work history, is accurate to the best of {userName}'s knowledge. This information should not be used for purposes other than reviewing {userName}'s qualifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
