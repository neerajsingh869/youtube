import { useState } from "react";
import styles from "./CategoriesBar.module.css";
import { useDispatch } from "react-redux";
import { getPopularVideos, getVideosByCategory } from "../../redux/actions/videosAction";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Redux toolkit",
  "Next.js",
  "Firebase",
  "SCSS",
  "Bootstrap",
  "Tailwind css",
  "Podcast",
  "GitHub",
  "Coding",
  "Cricket",
  "English Songs",
  "Anime",
  "Hindi Songs",
  "India",
];

const CategoriesBar = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      dispatch(getPopularVideos('onmount'));
    } else {
      dispatch(getVideosByCategory(category, 'onmount'));
    }

    setActiveCategory(category);
  }

  return (
    <div className={styles.categoriesBar}>
      {keywords.map((value, index) => (
        <div
          key={index}
          onClick={() => handleCategoryClick(value)}
          className={activeCategory === value ? `${styles.active}` : ""}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default CategoriesBar;
