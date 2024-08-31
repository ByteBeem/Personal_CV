import "./Sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";
import { GiSkills } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";


const Sidebar = ({ active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    setLoading(true);
    localStorage.clear();
    setTimeout(() => {
      setLoading(false);
      window.location.href = "";
      closeSidebar();
    }, 2000);
  };
  return (
    <aside className={`sidebar ${active}`}>
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
          <p className="loading-text">Logging out...</p>
        </div>
      )}
      <div className="top">
        <h3>Donald Mxolisi</h3>
        <div className="close_btn">&times;</div>
      </div>

      <div className="middle">
        <Link
          onClick={() => setActiveItem("home")}
          className={activeItem === "home" ? "link active" : "link"}
          to="/dashboard"
        >
          <IoHome className="icon" />
          <span>Home</span>
        </Link>



        <Link
          onClick={() => setActiveItem("Skills")}
          className={activeItem === "Skills" ? "link active" : "link"}
          to="/Skills"
        >
          <GiSkills className="icon" />
          <span>Skills</span>
        </Link>

        <Link

          onClick={() => setActiveItem("Projects")}
          className={activeItem === "Projects" ? "link active" : "link"}
          to="/Projects"
        >
          <GrProjects className="icon" />
          <span>Projects</span>
        </Link>


          <Link className="link" to="/profile">
            <FaUser className="icon" />
            <span>Profile</span>
          </Link>
        
      </div>
    </aside>
  );
};

export default Sidebar;