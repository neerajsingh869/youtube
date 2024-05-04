/* eslint-disable react/prop-types */
import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/login/Login";
import Error from "./components/error/Error";

const Layout = ({children}) => {
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
        {children}
      </Container>
    </div>
   </>
  )
}

function App() {
  const routes = createRoutesFromElements(
    <Route path="/" errorElement={<Error />}>
      <Route index={true} element={
        <Layout>
          <Home />
        </Layout>
      } />
      <Route path="login" element={<Login />} />
    </Route>
  )

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
