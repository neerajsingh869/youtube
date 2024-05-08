import styles from "./Comment.module.css";
import profilePhoto from "../../assets/profile.png";
import moment from "moment";

const Comment = () => {
  return (
    <div className={styles.comment}>
      <img src={profilePhoto} alt="Profile Photo" />
      <div className={styles.commentBody}>
        <div className={styles.commentHeader}>
          <span style={{fontSize: "0.8rem", cursor: "pointer", marginRight: "0.25rem", color: "var(--text-color-primary)"}}>
            @neerajsingh869
          </span>
          <span style={{fontSize: "0.7rem", cursor: "pointer", color: "var(--text-color-secondary)"}}>
            {moment("2023-09-10").fromNow()}
          </span>
        </div>
        <div className={styles.commentText}>
          Ek acha Senior Developer banne ke liye mujhe Debugging aur Attention to Details wale aspect mein thoda aur work karna hai. 
          Baki 7 points toh mai kaafi time se follow karta aa raha hu.
        </div>
      </div>
    </div>
  )
};

export default Comment;