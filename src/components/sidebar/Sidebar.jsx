/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import styles from "./Sidebar.module.css";

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHome,
} from "react-icons/md";
import { logout } from "../../redux/actions/authAction";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebar, toggleSidebar }) => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <nav
      className={
        sidebar ? `${styles.sidebar} ${styles.open}` : `${styles.sidebar}`
      }
      onClick={toggleSidebar}
    >
      <NavLink to="/" className={({ isActive }) =>
        isActive ? `${styles.linkActive} ${styles.navLink}` : `${styles.navLink}`
      }>
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </NavLink>
      <NavLink to="/feed/subscriptions" className={({ isActive }) =>
        isActive ? `${styles.linkActive} ${styles.navLink}` : `${styles.navLink}`
      }>
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </NavLink>
      <NavLink to="/feed/likedVideos" className={({ isActive }) =>
        isActive ? `${styles.linkActive} ${styles.navLink}` : `${styles.navLink}`
      }>
        <li>
          <MdThumbUp size={23} />
          <span>Liked Videos</span>
        </li>
      </NavLink>
      <hr style={{color: "white"}} />
      <li className={styles.navLink} style={{cursor: "pointer"}} onClick={handleLogout}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr style={{color: "white"}} />
    </nav>
  );
};

export default Sidebar;
