import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../../redux/actions/videosAction";
import { Container } from "react-bootstrap";
import VideoSearch from "../../components/videoSearch/VideoSearch";
import SearchSkeleton from "../../components/skeleton/SearchSkeleton";

const Search = () => {
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [dispatch, query]);

  const {videos, loading} = useSelector(state => state.searchedVideos);
  
  return (
    <Container>
      {
        !loading ? videos.map(video => <VideoSearch key={video.id.videoId} video={video} />) : [...Array(15)].map((_, index) => <SearchSkeleton key={index} />)
      }
    </Container>
  )
};

export default Search;