import styles from "./VideoHorizontal.module.css";
import numeral from "numeral";
import moment from "moment";

const VideoHorizontal = () => {
  return (
    <div className={styles.videoInfo}>
        <img className={styles.videoThumbnail} src="https://i.ytimg.com/vi/I58x-1H4bbA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCwRrfRQtotDIqeSqyGAVN1Og2UWQ" alt="" />
        {/* <LazyLoadImage style={{width: "32px"}} src={channelIcon?.url} effect="blur" /> */}
        <div className={styles.videoDetails}>
          <span className={styles.videoTitle}>
            Why MOST People FAIL to Learn to Code? | Tanay Pratap Hindi
          </span>
          <div>
            <span style={{fontSize: "0.85rem", marginBottom: "-0.25rem", color: "var(--text-color-secondary)"}}>Tanay Pratap</span>
            <div>
              <span style={{fontSize: "0.85rem", color: "var(--text-color-secondary)"}}>
                {numeral(99000).format('0.a')} views 
              </span>
              <span style={{marginInline: "4px", color: "var(--text-color-secondary)"}}>•</span> 
              <span style={{fontSize: "0.85rem", color: "var(--text-color-secondary)"}}>
                {moment("2021-02-08").fromNow()}
              </span>
            </div>
          </div>
        </div>
      </div>
  )
};

export default VideoHorizontal;