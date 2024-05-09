/* eslint-disable react/prop-types */
import styles from "./VideoMetadata.module.css";
import numeral from "numeral";
import moment from "moment";

import { MdThumbUpOffAlt, MdThumbDownOffAlt } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkSubscriptionStatus, getChannelDetails } from "../../redux/actions/channelAction";

const VideoMetadata = ({video}) => {
  const {snippet: {publishedAt, title, description, channelTitle, channelId}, statistics: {likeCount, viewCount}} = video;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSubscriptionStatus(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  const {channel} = useSelector(state => state.channelDetails);
  const {subscriptionStatus} = useSelector(state => state.subscriptionStatus);

  return (
    <div className={styles.videoMetadata}>
      <div className={styles.videoTop}>
        <p className={styles.videoTitle}>{title}</p>
        <div className={styles.videoDetails}>
          <div className={styles.videoChannel}>
            <img src={channel?.snippet?.thumbnails?.default?.url} alt="" />
            <div className={styles.videoChannelInfo}>
              <div className={styles.videoChannelName}>{channelTitle}</div>
              <div style={{fontSize: "0.75rem", color: "var(--text-color-secondary)"}}>
                {numeral(channel?.statistics?.subscriberCount).format('0.a')} subscribers 
              </div>
            </div>
            <button className={subscriptionStatus ? styles.subscribed : undefined}>
              {subscriptionStatus ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <div className={styles.videoSentiments}>
            <button>
              <MdThumbUpOffAlt size={22} />
              <span style={{color: "white", marginLeft: "0.25rem"}}>
                {numeral(likeCount).format('0.a')}
              </span>
            </button>
            <button>
              <MdThumbDownOffAlt size={22} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.videoDescription}>
        <div className={styles.videoStats}>
          <span>
            {numeral(viewCount).format('0.a')} views 
          </span>
          <span>
            {moment(publishedAt).fromNow()}
          </span>
        </div>
        <div className={styles.videoAboutMe}>
          <ShowMoreText
            lines={2}
            more="...more"
            less="Show less"
            expanded={false}
            anchorClass={styles.showMoreText}
          >
            {description}
          </ShowMoreText>
        </div>
      </div>
    </div>
  )
};

export default VideoMetadata;