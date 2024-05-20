import { useParams } from "react-router-dom";
import styles from "./Channel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideosByChannel } from "../../redux/actions/videosAction";
import { Col, Container, Row } from "react-bootstrap";
import Video from "../../components/video/Video";
import HomeSkeleton from "../../components/skeleton/HomeSkeleton";
import { checkSubscriptionStatus, getChannelDetails } from "../../redux/actions/channelAction";
import numeral from "numeral";
import ShowMoreText from "react-show-more-text";
import InfiniteScroll from "react-infinite-scroll-component";

const Channel = () => {
  const {channelId} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  const fetchData = () => {
    dispatch(getVideosByChannel(channelId));
  }

  const {videos, loading: channelVideosLoading} = useSelector(state => state.channelVideos);
  const {channel} = useSelector(state => state.channelDetails);
  const {subscriptionStatus} = useSelector(state => state.subscriptionStatus);

  return (
    <div>
      {/* channel banner */}
      <div className={styles.channelTop}>
        <div className={styles.channelLogo}>
          <img src={channel?.snippet?.thumbnails?.default?.url} alt={`${channel?.snippet?.title} Logo`} />
        </div>
        <div className={styles.channelDetails}>
          <div className={styles.channelTitle}>{channel?.snippet?.title}</div>
          <div>
            <span style={{color: "var(--text-color-secondary)"}}>{channel?.snippet?.customUrl}</span>
            <span style={{marginInline: "4px", color: "var(--text-color-secondary)"}}>•</span> 
            <span style={{color: "var(--text-color-secondary)"}}>
              {numeral(channel?.statistics?.subscriberCount).format('0.a')} subscribers 
            </span>
            <span style={{marginInline: "4px", color: "var(--text-color-secondary)"}}>•</span> 
            <span style={{color: "var(--text-color-secondary)"}}>
              {channel?.statistics?.videoCount} videos
            </span>
          </div>
          <div className={styles.channelDescription}>
            <ShowMoreText
              lines={2}
              more="...more"
              less="Show less"
              expanded={false}
              anchorClass={styles.showMoreText}
            >
              {channel?.snippet?.description}
            </ShowMoreText>
          </div>
          <button className={subscriptionStatus ? styles.subscribed : undefined}>
              {subscriptionStatus ? "Subscribed" : "Subscribe"}
            </button>
        </div>
      </div>
      {/* channel videos */}
      <Container>
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
          <Row className="mt-2">
            {
              !channelVideosLoading ? 
              videos.map((video, index) => (
                <Col key={`${video.id} ${index}`} lg={3} md={4} sm={6}>
                  <Video video={video} channel />
                </Col>
              ))
              : 
              [...new Array(20)].map((_, index) => (
                <Col key={index} lg={3} md={4}>
                  <HomeSkeleton channel />
                </Col>
              ))
            }
          </Row>
        </InfiniteScroll>
      </Container>
    </div>
  )
}

export default Channel;