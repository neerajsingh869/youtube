/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import request from "../../../api";
import styles from "./Video.module.css";
import moment from "moment/moment";
import numeral from "numeral";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from "react-router-dom";

const Video = ({video, channel}) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const navigate = useNavigate();

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
    thumbnails: {medium}
  }, contentDetails} = video;

  const parsedVideoId = id?.videoId || contentDetails?.videoId || id;

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

  const handleVideoClick = () => {
    navigate(`/watch/${parsedVideoId}`);
  }
  
  return (
    <div className={styles.video} onClick={handleVideoClick}>
      <div className={styles.videoTop}>
        {/* <img src={medium?.url} alt="" /> */}
        <LazyLoadImage src={medium?.url} effect="blur" />
        <span className={styles.videoDuration}>{parsedDuration}</span>
      </div>
      <div className={styles.videoInfo}>
        {/* <img src={channelIcon?.url} alt="" /> */}
        { !channel && <LazyLoadImage style={{width: "32px"}} src={channelIcon?.url} effect="blur" /> }
        <div className={styles.videoDetails}>
          <span className={styles.videoTitle}>{title}</span>
          <div>
            {!channel && <span style={{fontSize: "0.85rem", marginBottom: "-0.25rem", color: "var(--text-color-secondary)"}}>{channelTitle}</span>}
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
        </div>
      </div>
    </div>
  )
};

export default Video;
