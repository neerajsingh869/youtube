import styles from "./Video.module.css";

const Video = () => {
  return (
    <div className={styles.video}>
      <div className={styles.videoTop}>
        <img src="https://i.ytimg.com/vi/c21Kwiwtksc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAKRadNLCvyPXZk5Mtjqwpe1-_EVg" alt="" />
        <span>05:43</span>
      </div>
      <div className={styles.videoInfo}>
        <img src="https://yt3.ggpht.com/gw6BRWav3SyG39C2kmEM1VSb5ocjEWuKRBKPhRndqOKmAxj3rzB5OOVQKeE0751DJrPWJH7c=s68-c-k-c0x00ffffff-no-rj" alt="" />
        <div className={styles.videoDetails}>
          <span>9 Passive Income ideas</span>
          <div>
            <span style={{fontSize: "0.85rem", marginBottom: "-0.25rem", color: "var(--text-color-secondary)"}}>Ruri Ohama</span>
            <div>
              <span style={{fontSize: "0.85rem", color: "var(--text-color-secondary)"}}>
                643K views 
              </span>
              <span style={{marginInline: "4px", color: "var(--text-color-secondary)"}}>•</span> 
              <span style={{fontSize: "0.85rem", color: "var(--text-color-secondary)"}}>
                9 months ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Video;
