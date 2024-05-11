/* eslint-disable react/prop-types */

import styles from "./Comment.module.css";
import moment from "moment";

const Comment = ({comment}) => {
  const topLevelComment = comment?.snippet?.topLevelComment?.snippet;

  return (
    <div className={styles.comment}>
      <img src={topLevelComment?.authorProfileImageUrl} alt="Profile Photo" />
      <div className={styles.commentBody}>
        <div className={styles.commentHeader}>
          <span style={{fontSize: "0.8rem", cursor: "pointer", marginRight: "0.25rem", color: "var(--text-color-primary)"}}>
            {topLevelComment?.authorDisplayName}
          </span>
          <span style={{fontSize: "0.7rem", cursor: "pointer", color: "var(--text-color-secondary)"}}>
            {moment(topLevelComment?.publishedAt).fromNow()}
          </span>
        </div>
        <div className={styles.commentText}>
          {topLevelComment?.textOriginal}
        </div>
      </div>
    </div>
  )
};

export default Comment;