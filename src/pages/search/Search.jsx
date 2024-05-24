import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../../redux/actions/videosAction";
import { Container } from "react-bootstrap";
import VideoSearch from "../../components/videoSearch/VideoSearch";
import SearchSkeleton from "../../components/skeleton/SearchSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Search.module.css";
import { Helmet } from "react-helmet";

const Search = () => {
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query, 'onmount'));
  }, [dispatch, query]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  const fetchData = () => {
    dispatch(getVideosBySearch(query));
  }

  return (
    <Container>
      <Helmet>
        <title>{query} - YouTube</title>
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
        {!loading
          ? videos.map((video, index) => (
              <VideoSearch key={index} video={video} />
            ))
          : [...Array(15)].map((_, index) => <SearchSkeleton key={index} />)}
      </InfiniteScroll>
      
    </Container>
  );
};

export default Search;
