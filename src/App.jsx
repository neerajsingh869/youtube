import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="app_container border border-info">
        <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} />
        <Container fluid className="app_main border border-warning">
          <Home />
        </Container>
      </div>
    </>
  );
}

export default App;
