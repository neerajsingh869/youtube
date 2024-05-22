/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import request from "../../../api";
import styles from "./VideoSearch.module.css";
import moment from "moment/moment";
import numeral from "numeral";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscriptionStatus, getChannelDetails } from "../../redux/actions/channelAction";
import VideoChannel from "../videoChannel/VideoChannel";

const VideoSearch = ({video}) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seconds = moment.duration(duration).asSeconds();
  const hours = moment.duration(duration).hours();
  
  let parsedDuration;
  if (hours === 0) {
    parsedDuration = moment.utc(seconds * 1000).format('mm:ss');
  } else {
    parsedDuration = moment.utc(seconds * 1000).format('HH:mm:ss');
  }

  const {id, snippet: {
    channelId,
    channelTitle,
    title,
    publishedAt,
    description,
    thumbnails: {medium}
  }} = video;

  const parsedVideoId = id?.videoId || id;

  useEffect(() => {
    const getVideoDetails = async () => {
      const {data: {items}} = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: parsedVideoId
        }
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVideoDetails();
  }, [parsedVideoId])

  useEffect(() => {
    const getChannelIcon = async () => {
      const {data: {items}} = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId
        }
      });

      setChannelIcon(items[0].snippet.thumbnails.default);
    };

    getChannelIcon();
  }, [channelId])

  useEffect(() => {
    dispatch(checkSubscriptionStatus(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  const {subscriptionStatus} = useSelector(state => state.subscriptionStatus);

  const handleVideoClick = () => {
    navigate(`/watch/${parsedVideoId}`);
  }

  const isVideo = id.kind === 'youtube#video';

  if (!isVideo) {
    return (
      <VideoChannel subscriptionStatus={subscriptionStatus} channelId={channelId} />
    )
  }
  
  return (
    <div className={styles.video} onClick={handleVideoClick}>
      <div className={styles.videoLeft}>
        {/* <img src={medium?.url} alt="" /> */}
        <LazyLoadImage src={medium?.url} effect="blur" />
        <span className={styles.videoDuration}>{parsedDuration}</span>
      </div>
      <div className={styles.videoInfo}>
        {/* <img src={channelIcon?.url} alt="" /> */}
        <div className={styles.videoDetails}>
          <div>
            <span className={styles.videoTitle}>{title}</span>
            <div>
              <span style={{fontSize: "0.85rem", color: "var(--text-color-secondary)"}}>
                {numeral(views).format('0.a')} views
              </span>
              <span style={{marginInline: "4px", color: "var(--text-color-secondary)"}}>•</span> 
              <span style={{fontSize: "0.85rem", color: "var(--text-color-secondary)"}}>
                {moment(publishedAt).fromNow()}
              </span>
            </div>
          </div>
          <div>
            <div>
              <LazyLoadImage style={{width: "26px", objectFit: "contain", marginRight: "0.5rem"}} src={channelIcon?.url} effect="blur" />
              <span style={{fontSize: "0.75rem", marginBottom: "-0.25rem", color: "var(--text-color-secondary)"}}>{channelTitle}</span>
            </div>
          </div>
          <div className={styles.videoDescription} style={{wordBreak: "normal" ,fontSize: "0.75rem", color: "var(--text-color-secondary)"}}>
            {description}
          </div>
        </div>
      </div>
    </div>
  )
};

export default VideoSearch;
