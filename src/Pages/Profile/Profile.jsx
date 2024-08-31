import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../../App.scss";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import UserProfile from "../../assets/user.jpeg";
import Error from "../ErrorModal/ErrorModal";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";



function Profile({ showSidebar, active, closeSidebar }) {
  const [errorMessage , setErrorMessage] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const name = userData.name;
  const surname = userData.surname;


  useEffect(() => {

      fetchUserData();

  }, []);



  const fetchUserData = () => {
    setLoading(true);
    axios
      .get("https://profitpilot.ddns.net/users/spinz4bets/getUserData", {
        headers: {
          
        }
      })
      .then((response) => {

        setUserData(response.data);
      


      })
      .catch((error) => {


      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="profile">
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
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

              <Link className="form_btn" to="/Refer">
                Referral
              </Link>

            
            </div>
          </div>
        </div>

      </div>
      {errorModalOpen && <Error errorMessage={errorMessage} isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />}

    </div>
  );
}

export default Profile;