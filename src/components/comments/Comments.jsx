import styles from "./Comments.module.css";
import profilePhoto from "../../assets/profile.png";
import Comment from "../comment/Comment";

const Comments = () => {
  return (
    <div className={styles.comments}>
      <p>1000 Comments</p>
      <div className={styles.commentsForm}>
        <img src={profilePhoto} alt="" />
        <input type="text" placeholder="Add a comment..." />
        <button>Comment</button>
      </div>
      <div className={styles.commentsList}>
        {
          [...Array(20)].map((_, index) => <Comment key={index} />)
        }
      </div>
    </div>
  )
};

export default Comments;