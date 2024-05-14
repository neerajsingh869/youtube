import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionsChannel } from "../../redux/actions/channelAction";
import VideoChannel from "../../components/videoChannel/VideoChannel";
import SubscriptionSkeleton from "../../components/skeleton/SubscriptionSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Subscriptions.module.css";

const Subscriptions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionsChannel());
  }, [dispatch]);

  const { channels, loading } = useSelector(
    (state) => state.subscriptionsChannel
  );

  const fetchData = () => {
    dispatch(getSubscriptionsChannel());
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={channels.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        }
        className={styles.infiniteScrollContainer}
      >
        {!loading
          ? channels.map((channel, index) => (
              <VideoChannel
                subscriptionStatus={true}
                key={index}
                channelId={channel?.snippet?.resourceId?.channelId}
              />
            ))
          : [...Array(10)].map((_, index) => (
              <SubscriptionSkeleton key={index} />
            ))}
      </InfiniteScroll>
    </div>
  );
};

export default Subscriptions;
