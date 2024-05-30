/* eslint-disable react/prop-types */
import numeral from "numeral";
import styles from "./VideoChannel.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscriptionStatus } from "../../redux/actions/channelAction";

const VideoChannel = ({channelId, search = false}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [channel, setChannel] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();

    navigate(`/channel/${channelId}`);
  }

  useEffect(() => {
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  const { subscriptionStatus } = useSelector(
    (state) => state.subscriptionStatus
  );

  const { googleAccessToken } = useSelector((state) => state.auth);

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

  useEffect(() => {
    setIsSubscribed(subscriptionStatus);
  }, [subscriptionStatus]);

  const toggleSubsription = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isSubscribed) {
        // get subscription object to know id in order to unsubcribe it
        const response = await request('/subscriptions', {
          params: {
            part: "snippet",
            forChannelId: channelId,
            mine: true
          }, 
          headers: {
            Authorization: `Bearer ${googleAccessToken}`
          }
        })

        // unsubscribe channel
        await request('/subscriptions', {
          method: "delete",
          params: {
            id: response.data.items[0].id
          },
          headers: {
            Authorization: `Bearer ${googleAccessToken}`
          }
        })

        setIsSubscribed(false);
      } else {
        // subscribe
        console.log(channel);

        await request('/subscriptions', {
          method: "post",
          params: {
            part: "snippet"
          },
          headers: {
            Authorization: `Bearer ${googleAccessToken}`
          },
          data: {
            "snippet": {
              "resourceId": {
                "channelId": channel.id
              }
            }
          }
        });

        setIsSubscribed(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`${styles.channelData} ${search ? styles.channelDataSearch : undefined}`} onClick={handleClick}>
      <div className={`${styles.channelIconContainer} ${search ? styles.channelIconContainerSearch : undefined}`}>
        <img src={channel?.snippet?.thumbnails?.medium?.url} />
      </div>
      <div className={styles.channelRight}>
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
        <button className={isSubscribed ? styles.subscribed : undefined} onClick={toggleSubsription}>
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
    </div>
  )
}

export default VideoChannel;