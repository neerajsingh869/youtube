import styles from "./VideoMetadata.module.css";
import numeral from "numeral";
import moment from "moment";

import { MdThumbUpOffAlt, MdThumbDownOffAlt } from "react-icons/md";
import profilePhoto from "../../assets/profile.png";
import ShowMoreText from "react-show-more-text";

const VideoMetadata = () => {
  return (
    <div className={styles.videoMetadata}>
      <div className={styles.videoTop}>
        <p className={styles.videoTitle}>9 Habits of Highly Successful PROGRAMMERS! | Tanay Pratap Hindi</p>
        <div className={styles.videoDetails}>
          <div className={styles.videoChannel}>
            <img src={profilePhoto} alt="" />
            <div className={styles.videoChannelInfo}>
              <div className={styles.videoChannelName}>Tanay Pratap</div>
              <div style={{fontSize: "0.75rem", color: "var(--text-color-secondary)"}}>
                {numeral(100000).format('0.a')} subscribers 
              </div>
            </div>
            <button>Subscribe</button>
          </div>
          <div className={styles.videoSentiments}>
            <button>
              <MdThumbUpOffAlt size={22} />
              <span style={{color: "white", marginLeft: "0.25rem"}}>
                {numeral(1000).format('0.a')}
              </span>
            </button>
            <button>
              <MdThumbDownOffAlt size={22} />
              <span style={{color: "white", marginLeft: "0.25rem"}}>
                {numeral(500).format('0.a')}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.videoDescription}>
        <div className={styles.videoStats}>
          <span>
            {numeral(10000).format('0.a')} views 
          </span>
          <span>
            {moment("2022-10-10").fromNow()}
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium suscipit rerum illo facere neque beatae sed, rem officiis doloremque quod cumque voluptatum quo, accusantium quam veniam voluptatibus impedit. Aspernatur necessitatibus corporis dolores in minima eius nesciunt amet facere quos debitis. Ad quas suscipit, consequatur aut eum reiciendis voluptatum perspiciatis porro numquam, voluptate at esse velit. Deserunt cum similique mollitia fuga, facilis accusantium quibusdam omnis! Qui voluptatem, harum molestias, corrupti hic neque vitae accusamus cupiditate odio nulla repellendus? Excepturi aspernatur, minima cumque reiciendis sed libero maiores consequatur iste molestias aliquid architecto aliquam, assumenda error alias quo voluptates velit eius accusamus explicabo.
          </ShowMoreText>
        </div>
      </div>
    </div>
  )
};

export default VideoMetadata;