/* eslint-disable react/prop-types */
import styles from "./Header.module.css";

import { FaBars } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";

import youtubeLogo from "../../assets/youtube.png";
import profilePhoto from "../../assets/profile.png";

const Header = ({ toggleSidebar }) => {
  return (
    <header className={`border border-dark ${styles.header}`}>
      <div className={styles.headerStart}>
        <FaBars
          size={28}
          className={styles.headerMenu}
          onClick={toggleSidebar}
        />
        <div>
          <img
            src={youtubeLogo}
            alt="YouTube Logo"
            className={styles.headerLogo}
          />
          <span className={styles.youtubeName}>YouTube</span>
        </div>
      </div>

      <div className={styles.headerCenter}>
        <form>
          <input type="text" placeholder="Search" size={4} />
          <div></div>
          <button>
            <AiOutlineSearch size={28} />
          </button>
        </form>
      </div>

      <div className={styles.headerEnd}>
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={profilePhoto} alt="Profile Photo" />
      </div>
    </header>
  );
};

export default Header;
