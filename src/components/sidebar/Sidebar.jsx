/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import styles from "./Sidebar.module.css";

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdSentimentDissatisfied,
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
      <NavLink to="/sdfa" className={({ isActive }) =>
        isActive ? `${styles.linkActive} ${styles.navLink}` : `${styles.navLink}`
      }>
        <li>
          <MdThumbUp size={23} />
          <span>Liked Videos</span>
        </li>
      </NavLink>
      <NavLink to="/dsfsadf" className={({ isActive }) =>
        isActive ? `${styles.linkActive} ${styles.navLink}` : `${styles.navLink}`
      }>
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>
      </NavLink>
      <NavLink to="/dfsadf" className={({ isActive }) =>
        isActive ? `${styles.linkActive} ${styles.navLink}` : `${styles.navLink}`
      }>
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>
      </NavLink>
      <NavLink to="/dsafsdf" className={({ isActive }) =>
        isActive ? `${styles.linkActive} ${styles.navLink}` : `${styles.navLink}`
      }>
        <li>
          <MdSentimentDissatisfied size={23} />
          <span>I don&apos;t Know</span>
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
