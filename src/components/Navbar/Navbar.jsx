import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "../../Pages/ErrorModal/ErrorModal";
import "./Navbar.scss";
import { FaCircleInfo } from "react-icons/fa6";
import InfoModal from "../../Pages/InfoModal/InfoModal"; 

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState(false);  
  
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
    <>
      <header>
        <li>
          <div className="balance">
            {loading ? "Loading..." : (
              userData.name ? `${userData.name}` :
                ''
            )}
          </div>
        </li>
       
        <li>
          <FaCircleInfo 
            className="icon" 
            onClick={() => setInfoModalOpen(true)} 
            title="Regulations & Security Info" 
          />
        </li>
       
      </header>
      
      
      {errorModalOpen && <Error errorMessage={errorMessage} isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />}
      {infoModalOpen && <InfoModal isOpen={infoModalOpen} userName={userData.name} onClose={() => setInfoModalOpen(false)} />}
    </>
  );
};

export default Navbar;
