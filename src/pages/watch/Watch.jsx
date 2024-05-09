import { Col, Row } from "react-bootstrap";
import VideoMetadata from "../../components/videoMetadata/VideoMetadata";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import styles from "./Watch.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoById } from "../../redux/actions/videosAction";

const Watch = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("helajrlk")
    dispatch(getVideoById(id));
  }, [dispatch, id])

  const {video} = useSelector(state => state.selectedVideo);

  return (
    <Row>
      <Col lg={8}>
        <div className={styles.player}>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={video?.snippet?.title}
            frameBorder="0"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>

        {video ? <VideoMetadata video={video} /> : <h6>Loading...</h6>}
        <Comments videoId={id} />
      </Col>
      <Col lg={4}>
        {
          [...Array(10)].map((_, index) => <VideoHorizontal key={index} />)
        }
      </Col>
    </Row>
  );
};

export default Watch;
