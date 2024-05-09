import "bootstrap/dist/css/bootstrap.min.css";

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import './main.css';
import store from "./redux/store.js";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Error from "./components/error/Error.jsx";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Watch from "./pages/watch/Watch.jsx";

const routes = createRoutesFromElements(
  <Route path="/" errorElement={<Error />}>
    <Route index={true} element={
      <Layout>
        <Home />
      </Layout>
    } />
    <Route path="watch/:id" element={
      <Layout>
        <Watch />
      </Layout>
    } />
    <Route path="login" element={<Login />} />
  </Route>
)

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
