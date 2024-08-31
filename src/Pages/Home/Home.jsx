import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Error from "../ErrorModal/ErrorModal";
import "./Home.scss";
import { FiLoader } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Typed from 'typed.js';
import user from "../../assets/user.jpeg";
import { Link } from "react-router-dom";

const Home = ({ showSidebar, active, closeSidebar }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [maxContainerHeight, setMaxContainerHeight] = useState(window.innerHeight - 100);

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings:[
        "<i>Welcome to my</i> digital playground!",
        "Explore <b>innovative ideas</b> and creative solutions.",
        "Passionate about <u>technology</u> and <u>design</u>.",
        "Let's <span style='color: #ff5f6d;'>build</span> something amazing together.",
        "Driven by <i>curiosity</i> and <b>innovation</b>.",
        "Always <i>learning</i> and <b>growing</b> in the tech world."
      ],
      typeSpeed:50,
      backSpeed:30,
      
    });

    return () => {
      
      typed.destroy();
    };
  }, []);

  const handleResize = useCallback(() => {
    setMaxContainerHeight(window.innerHeight - 100);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div className="home">
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
        </div>
      )}
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="home_container" style={{ maxHeight: `${maxContainerHeight}px` }}>
        <Navbar showSidebar={showSidebar} />

        <div className="hero">
          <img src={user} alt="User" className="user-image" />
          <h1>Hi, I'm [Your Name]</h1>
          <span ref={el} />
          <p>Welcome to my personal space where I share my projects and passions.</p>
          <Link
            to="/projects"
            onClick={() => setActiveItem("Projects")}
            className={`cta-button ${activeItem === "Projects" ? "active" : ""}`}
          >
            Explore Projects
          </Link>
        </div>

        <div className="highlights">
          
         
          <div className="highlight">
            <h3>Contact</h3>
            <p>Let's connect and discuss potential collaborations or opportunities.</p>
          </div>
        </div>

        <div className="social-media">
          <h3>Follow Me</h3>
          <div className="icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          </div>
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
  );
};

export default Home;
