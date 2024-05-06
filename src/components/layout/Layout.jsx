/* eslint-disable react/prop-types */
import styles from "./Layout.module.css";

import Container from "react-bootstrap/esm/Container";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({children}) => {
  const {accessToken, loading} = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate('/login');
    }
  }, [loading, accessToken, navigate]);

  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
   <>
    <Header toggleSidebar={toggleSidebar} />
    <div className={styles.appContainer}>
      <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} />
      <Container fluid className="app_main">
        {children}
      </Container>
    </div>
   </>
  )
}

export default Layout;