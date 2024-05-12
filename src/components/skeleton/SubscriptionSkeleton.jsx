import Skeleton from "react-loading-skeleton";
import styles from "./SubscriptionSkeleton.module.css";

const SubscriptionSkeleton = () => {
  return (
    <div className={styles.channel}>
      <div className={styles.channelImg}>
        <Skeleton width="100%" height={180} />
      </div>
      <div className={styles.channelInfo}>
        <Skeleton height={15} width="80%" />
        <Skeleton height={15} width="60%" />
        <Skeleton height={15} width="80%" />
      </div>
      <div className={styles.subscriptionBtn}>
        <Skeleton height={40} width="65%" borderRadius={50} />
      </div>
    </div>
  )
};

export default SubscriptionSkeleton;