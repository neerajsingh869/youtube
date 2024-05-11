import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Home.module.css";

import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPopularVideos, getVideosByCategory } from "../../redux/actions/videosAction";
import InfiniteScroll from "react-infinite-scroll-component";
import 'react-loading-skeleton/dist/skeleton.css'
import HomeSkeleton from "../../components/skeleton/HomeSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const {accessToken} = useSelector(state => state.auth);

  useEffect(() => {
    // IMP: only send request to get popular videos if user is logged in
    // if you don't do it, then getPopularVideos will be dispatched even if
    // user is not signed in
    if (accessToken) {
      dispatch(getPopularVideos());
    }
  }, [dispatch, accessToken]);

  const { videos, activeCategory, loading } = useSelector(state => state.homeVideos);

  const fetchData = () => {
    if (activeCategory === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  }

  return (
    <Container>
      <Row>
        <CategoriesBar />
      </Row>
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
                <Col key={`${video.id} ${index}`} lg={3} md={4}>
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
  );
};

export default Home;
