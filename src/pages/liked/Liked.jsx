import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../../redux/actions/videosAction";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Liked.module.css";
import HomeSkeleton from "../../components/skeleton/HomeSkeleton";
import Video from "../../components/video/Video";

const Liked = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getLikedVideos('onmount'));
  }, [dispatch]);

  const {videos, loading} = useSelector(state => state.likedVideos);

  const fetchData = () => {
    dispatch(getLikedVideos());
  }

  return (
    <Container>
      <Helmet>
        <title>{`Liked videos - YouTube`}</title>
      </Helmet>
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        }
        className={styles.infiniteScrollContainer}
      >
        <Row>
          {
            !loading ? 
              videos.map((video, index) => (
                <Col key={`${video.id} ${index}`} lg={3} md={4} sm={6}>
                  <Video video={video} />
                </Col>
              ))
              : 
              [...new Array(20)].map((_, index) => (
                <Col key={index} lg={3} md={4}>
                  <HomeSkeleton />
                </Col>
              ))
          }
        </Row>
      </InfiniteScroll>
    </Container>
  )
}

export default Liked;