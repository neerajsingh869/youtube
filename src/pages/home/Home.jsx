import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPopularVideos } from "../../redux/actions/videosAction";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);
  
  return (
    <Container>
      <Row>
        <CategoriesBar />
      </Row>
      <Row>
        {[...new Array(10)].map((element, index) => (
          <Col key={index} lg={3} md={4}>
            <Video />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
