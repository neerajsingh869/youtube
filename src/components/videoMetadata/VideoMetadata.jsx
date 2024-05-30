/* eslint-disable react/prop-types */
import styles from "./VideoMetadata.module.css";
import numeral from "numeral";
import moment from "moment";

import {
  MdThumbUpOffAlt,
  MdThumbDownOffAlt,
  MdThumbUpAlt,
  MdThumbDownAlt,
} from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channelAction";
import request from "../../../api";
import { getVideoRating } from "../../redux/actions/videosAction";

const VideoMetadata = ({ video }) => {
  const [isVideoDisliked, setIsVideoDisliked] = useState(false);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    id,
    snippet: { publishedAt, title, description, channelTitle, channelId },
    statistics: { likeCount, viewCount },
  } = video;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSubscriptionStatus(channelId));
    dispatch(getChannelDetails(channelId));
    dispatch(getVideoRating(id));
  }, [dispatch, channelId, id]);

  const { channel } = useSelector((state) => state.channelDetails);
  const { subscriptionStatus } = useSelector(
    (state) => state.subscriptionStatus
  );
  const { googleAccessToken } = useSelector((state) => state.auth);

  const {videoRating} = useSelector(state => state.videoRating);
  console.log(videoRating);
  
  useEffect(() => {
    if (videoRating === 'dislike') {
      setIsVideoDisliked(true);
    } else {
      setIsVideoDisliked(false);
    }
  }, [videoRating])

  useEffect(() => {
    if (videoRating === 'like') {
      setIsVideoLiked(true);
    } else {
      setIsVideoLiked(false);
    }
  }, [videoRating])

  useEffect(() => {
    setIsSubscribed(subscriptionStatus);
  }, [subscriptionStatus]);

  const toggleLikeVideo = async (e) => {
    e.preventDefault();
    setIsVideoDisliked(false);

    if (isVideoLiked) {
      await request("/videos/rate", {
        method: "post",
        params: {
          id: id,
          rating: "none",
        },
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      });
    } else {
      await request("/videos/rate", {
        method: "post",
        params: {
          id: id,
          rating: "like",
        },
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      });
    }

    setIsVideoLiked(!isVideoLiked);
  };

  const toggleDislikeVideo = async (e) => {
    e.preventDefault();
    setIsVideoLiked(false);

    if (isVideoDisliked) {
      await request("/videos/rate", {
        method: "post",
        params: {
          id: id,
          rating: "none",
        },
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      });
    } else {
      await request("/videos/rate", {
        method: "post",
        params: {
          id: id,
          rating: "dislike",
        },
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      });
    }

    setIsVideoDisliked(!isVideoDisliked);
  };

  const toggleSubsription = async (e) => {
    e.preventDefault();

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
    <div className={styles.videoMetadata}>
      <div className={styles.videoTop}>
        <p className={styles.videoTitle}>{title}</p>
        <div className={styles.videoDetails}>
          <div className={styles.videoChannel}>
            <img src={channel?.snippet?.thumbnails?.default?.url} alt="" />
            <div className={styles.videoChannelInfo}>
              <div className={styles.videoChannelName}>{channelTitle}</div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-color-secondary)",
                }}
              >
                {numeral(channel?.statistics?.subscriberCount).format("0.a")}{" "}
                subscribers
              </div>
            </div>
            <button
              className={isSubscribed ? styles.subscribed : undefined}
              onClick={toggleSubsription}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <div className={styles.videoSentiments}>
            <button onClick={toggleLikeVideo}>
              {
                isVideoLiked ? <MdThumbUpAlt size={22} /> : <MdThumbUpOffAlt size={22} />
              }
              <span style={{ color: "white", marginLeft: "0.25rem" }}>
                {numeral(likeCount).format("0.a")}
              </span>
            </button>
            <button onClick={toggleDislikeVideo}>
              {isVideoDisliked ? <MdThumbDownAlt size={22} />: <MdThumbDownOffAlt size={22} />}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.videoDescription}>
        <div className={styles.videoStats}>
          <span>{numeral(viewCount).format("0.a")} views</span>
          <span>{moment(publishedAt).fromNow()}</span>
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
  );
};

export default VideoMetadata;
