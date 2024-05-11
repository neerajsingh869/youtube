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
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      <li>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
      <li>
        <MdThumbUp size={23} />
        <span>Liked Videos</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I don&apos;t Know</span>
      </li>
      <hr style={{color: "white"}} />
      <li onClick={handleLogout}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr style={{color: "white"}} />
    </nav>
  );
};

export default Sidebar;
