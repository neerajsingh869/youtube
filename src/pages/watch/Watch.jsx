import { Col, Row } from "react-bootstrap";
import VideoMetadata from "../../components/videoMetadata/VideoMetadata";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import styles from "./Watch.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularVideos, getVideoById } from "../../redux/actions/videosAction";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet";

const Watch = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getPopularVideos());
  }, [dispatch, id])

  const {video} = useSelector(state => state.selectedVideo);

  const { videos, loading: relatedVideosLoading } = useSelector(state => state.homeVideos);

  return (
    <Row>
      <Helmet>
        <title>{`${video?.snippet?.title} - YouTube`}</title>
      </Helmet>
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
        <Comments videoId={id} commentCount={video?.statistics?.commentCount} />
      </Col>
      <Col lg={4}>
        {
          !relatedVideosLoading ?
          videos.map((video, index) => <VideoHorizontal video={video} key={index} />)
          :
          <Skeleton width="100%" height="130px" count={15} />
        }
      </Col>
    </Row>
  );
};

export default Watch;
