/* eslint-disable react/prop-types */
import Skeleton from "react-loading-skeleton";
import styles from "./CommentSkeleton.module.css";

const CommentSkeleton = () => {
  return (
    <div className={styles.comment}>
      <Skeleton circle={true} height={32} width={32} />
      <div className={styles.commentDetails}>
        <Skeleton height={15} width="15%" />
        <Skeleton height={15} width="100%" />
      </div>
    </div>
  )
};

export default CommentSkeleton;