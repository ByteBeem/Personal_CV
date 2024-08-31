import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import UserProfile from "../../assets/user.jpeg";
import Error from "../ErrorModal/ErrorModal";
import { FaSpinner } from "react-icons/fa";



function Profile({ showSidebar, active, closeSidebar }) {
  const [errorMessage , setErrorMessage] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const name = userData.name;
  const surname = userData.surname;
  const Email = userData.email;


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
      } else {
        setErrorMessage("Failed to fetch data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      {loading && (
        <div className="overlay">
          <FaSpinner className="loading-spinner" />
        </div>
      )}
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="profile_container">
        <Navbar showSidebar={showSidebar} />

        <div className="top">
          <div className="user_info">
            <div className="profile_pic">
              <img src={UserProfile} alt="" />

            </div>

            <div className="text">
              <span>Fullname:</span>
              <div className="text_item">{name}</div>

              <span>Surname:</span>
              <div className="text_item">{surname}</div>
              <span>Email:</span>
              <div className="text_item">{Email}</div>
            
            </div>

            
          </div>
          
      </div>
      
      <div className="highlight">
            <h3>About me</h3>
            <p>{userData.about}</p>
          </div>
        </div>
      {errorModalOpen && <Error errorMessage={errorMessage} isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />}

    </div>
  );
}

export default Profile;