/* eslint-disable react/prop-types */
import numeral from "numeral";
import styles from "./VideoChannel.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../../../api";

const VideoChannel = ({channelId, subscriptionStatus = false}) => {
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();

    navigate(`/channel/${channelId}`);
  }

  useEffect(() => {
    const fetchChannelDetails = async () => {
      const response = await request('/channels', {
        params: {
          part: "snippet,statistics,contentDetails",
          id: channelId
        }
      });

      setChannel(response.data.items[0]);
    }

    fetchChannelDetails();
  }, [channelId])

  return (
    <div className={styles.channelData} onClick={handleClick}>
      <div className={styles.channelIconContainer}>
        <img src={channel?.snippet?.thumbnails?.medium?.url} />
      </div>
      <div className={styles.channelDetails}>
        <div className={styles.channelTitle}>{channel?.snippet?.title}</div>
        <div className={styles.channelStats}>
          <span style={{fontSize: "0.8rem", color: "var(--text-color-secondary)"}}>
            {channel?.snippet?.customUrl}
          </span>
          <span style={{marginInline: "4px", color: "var(--text-color-secondary)"}}>•</span>
          <span style={{fontSize: "0.8rem", color: "var(--text-color-secondary)"}}>
            {numeral(channel?.statistics?.subscriberCount).format('0.a')} subscribers  
          </span> 
        </div>
        <div style={{fontSize: "0.8rem", color: "var(--text-color-secondary)"}} className={styles.channelDescription}>
          {channel?.snippet?.description}
        </div>
      </div>
      <button className={subscriptionStatus ? styles.subscribed : undefined}>
        {subscriptionStatus ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  )
}

export default VideoChannel;