/* eslint-disable react/prop-types */

import styles from "./Comments.module.css";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCommentsOfVideoById } from "../../redux/actions/commentsAction";
import { useEffect, useState } from "react";

const Comments = ({videoId, commentCount}) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [dispatch, videoId])

  const {comments} = useSelector(state => state.commentsList);
  const auth = useSelector(state => state.auth);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (commentText.length === 0) return;

    dispatch(addComment(videoId, commentText));

    setCommentText('');
  }

  return (
    <div className={styles.comments}>
      <p>{commentCount} Comments</p>
      <div className={styles.commentsForm}>
        <img src={auth?.user?.photoUrl} alt="avatar" />
        <input type="text" placeholder="Add a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        <button onClick={handleCommentSubmit}>Comment</button>
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