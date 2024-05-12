/* eslint-disable react/prop-types */
import styles from "./Header.module.css";

import { FaBars } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";

import youtubeLogo from "../../assets/youtube.png";
import profilePhoto from "../../assets/profile.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ toggleSidebar }) => {
  const [searchInput, setSearchInput] = useState('');
  
  const navigate = useNavigate();

  const {query} = useParams();

  useEffect(() => {
    if (query) {
      setSearchInput(query);
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchInput}`);
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerStart} onClick={() => navigate('/')}>
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
        <form onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Search" size={4} value={searchInput} onChange={e => setSearchInput(e.target.value)} />
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
