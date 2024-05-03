import "./App.css";
import Container from "react-bootstrap/Container";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className="app_container border border-info">
        <Sidebar />
        <Container fluid className="app_main border border-warning">
          <Home />
        </Container>
      </div>
    </>
  );
}

export default App;
