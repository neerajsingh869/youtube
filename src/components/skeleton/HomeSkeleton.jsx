/* eslint-disable react/prop-types */
import Skeleton from "react-loading-skeleton";
import styles from "./HomeSkeleton.module.css";

const HomeSkeleton = ({channel}) => {
  return (
    <div className={styles.video}>
      <Skeleton height={180} width="100%" />
      <div className={styles.videoInfo}>
        {!channel && <Skeleton circle={true} height={32} width={32} />}
        <div className={styles.videoDetails}>
          <Skeleton height={15} width="90%" />
          <Skeleton height={15} width="70%" />
        </div>
      </div>
    </div>
  )
};

export default HomeSkeleton;