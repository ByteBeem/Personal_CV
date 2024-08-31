import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "../../Pages/ErrorModal/ErrorModal";
import "./Navbar.scss";
import { FaCircleInfo } from "react-icons/fa6";
import InfoModal from "../../components/../Pages/InfoModal/InfoModal"; 

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState(false);  
  
  useEffect(() => {

      fetchUserData();
    
  }, []);

  const fetchUserData = () => {
    setLoading(true);
    axios
      .get('https://profitpilot.ddns.net/users/spinz4bets/balance', {
        headers: {
       
        }
      })
      .then((response) => {
        const balance = response.data;
        if (balance !== undefined) {
          setUserData(balance);
          const code  = balance.acc;
          localStorage.setItem("ReferralCode" ,code );
        }
      })
      .catch((error) => {
        setErrorMessage(`${error.message} ,  Check Your internet connection`);
        
      })
      .finally(() => {
        setLoading(false);
      });
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
      {infoModalOpen && <InfoModal isOpen={infoModalOpen} userName={'Donald Mxolisi'} onClose={() => setInfoModalOpen(false)} />}
    </>
  );
};

export default Navbar;
