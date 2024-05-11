import Skeleton from "react-loading-skeleton";
import styles from "./SearchSkeleton.module.css";

const SearchSkeleton = () => {
  return (
    <div className={styles.video}>
      <Skeleton width={280} height={180} />
      <div className={styles.videoInfo}>
        <Skeleton height={15} width="80%" />
        <Skeleton height={15} width="70%" />
        <Skeleton height={15} width="80%" />
      </div>
    </div>
  )
};

export default SearchSkeleton;