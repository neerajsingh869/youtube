import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPopularVideos } from "../../redux/actions/videosAction";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos } = useSelector(state => state.homeVideos);
  
  return (
    <Container>
      <Row>
        <CategoriesBar />
      </Row>
      <Row>
        {videos.map(video => (
          <Col key={video.id} lg={3} md={4}>
            <Video video={video} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
