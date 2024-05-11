/* eslint-disable react/prop-types */
import styles from "./VideoHorizontal.module.css";
import numeral from "numeral";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../../api";

const VideoHorizontal = ({video}) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);

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
    channelTitle,
    title,
    publishedAt,
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

  const handleVideoClick = () => {
    navigate(`/watch/${parsedVideoId}`);
  }

  return (
    <div className={styles.videoInfo} onClick={handleVideoClick}>
      <div className={styles.videoTop}>
        <LazyLoadImage src={medium?.url} effect="blur" />
        <span className={styles.videoDuration}>{parsedDuration}</span>
      </div>
      <div className={styles.videoDetails}>
        <span className={styles.videoTitle}>
          {title}
        </span>
        <div>
          <span style={{fontSize: "0.85rem", marginBottom: "-0.25rem", color: "var(--text-color-secondary)"}}>{channelTitle}</span>
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
  )
};

export default VideoHorizontal;