import "./Sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { GiSkills } from "react-icons/gi";
import Error from "../../Pages/ErrorModal/ErrorModal";
import { GrProjects } from "react-icons/gr";
import React, { useEffect } from "react";


const Sidebar = ({ active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [userData, setUserData] = useState({});
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {

    fetchUserData();
  
}, []);

const fetchUserData = async() => {
  setLoading(true);
  try{

    const response =  await axios.get('https://profitpilot.ddns.net/Data/v1/details',{

    })

    if(response.status === 200){
      setUserData(response.data);
    }

  }catch (error) {
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
};


  return (
    <aside className={`sidebar ${active}`}>
     
      

       <div className="top">
            {loading ? "Loading..." : (
              userData.name ? `${userData.name}` :
                ''
            )}
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
      {errorModalOpen && <Error errorMessage={errorMessage} isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />}
    </aside>
  );
};

export default Sidebar;