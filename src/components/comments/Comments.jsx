/* eslint-disable react/prop-types */

import styles from "./Comments.module.css";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/commentsAction";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentSkeleton from "../skeleton/CommentSkeleton";

const Comments = ({ videoId, commentCount }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId, "onmount"));
  }, [dispatch, videoId]);

  const { comments, loading } = useSelector((state) => state.commentsList);
  const auth = useSelector((state) => state.auth);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (commentText.length === 0) return;

    dispatch(addComment(videoId, commentText));

    setCommentText("");
  };

  const fetchData = () => {
    console.log("Next comments being fetched!");
    dispatch(getCommentsOfVideoById(videoId));
  };

  return (
    <div className={styles.comments}>
      <p>{commentCount} Comments</p>
      <div className={styles.commentsForm}>
        <img src={auth?.user?.photoUrl} alt="avatar" />
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Comment</button>
      </div>
      <div className={styles.commentsList}>
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchData}
          hasMore={true}
          loader={
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status" />
            </div>
          }
          className={styles.infiniteScrollContainer}
        >
          {!loading
            ? comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))
            : [...Array(20)].map((_, index) => <CommentSkeleton key={index} />)}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Comments;
