/* eslint-disable react/prop-types */

import styles from "./Comments.module.css";
import profilePhoto from "../../assets/profile.png";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsOfVideoById } from "../../redux/actions/commentsAction";
import { useEffect } from "react";

const Comments = ({videoId}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [dispatch, videoId])

  const {comments} = useSelector(state => state.commentsList);
  console.log(comments);

  return (
    <div className={styles.comments}>
      <p>{comments.length} Comments</p>
      <div className={styles.commentsForm}>
        <img src={profilePhoto} alt="" />
        <input type="text" placeholder="Add a comment..." />
        <button>Comment</button>
      </div>
      <div className={styles.commentsList}>
        {
          comments.map((comment, index) => <Comment comment={comment} key={index} />)
        }
      </div>
    </div>
  )
};

export default Comments;