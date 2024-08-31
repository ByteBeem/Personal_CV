import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Error from "../ErrorModal/ErrorModal";
import "./Home.scss";
import { FiLoader } from "react-icons/fi";

const Home = ({ showSidebar, active, closeSidebar }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maxContainerHeight, setMaxContainerHeight] = useState(window.innerHeight - 100);
 

  const handleResize = useCallback(() => {
    setMaxContainerHeight(window.innerHeight - 100);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ handleResize]);

 

  return (
    <div className="home">
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
        </div>
      )}
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <div className="home_container">
        <Navbar showSidebar={showSidebar} />

     
    </div>
      { errorModalOpen && <Error errorMessage={errorMessage} isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} /> }
    </div >
  );
};

export default Home;
