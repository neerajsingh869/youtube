import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionsChannel } from "../../redux/actions/channelAction";
import VideoChannel from "../../components/videoChannel/VideoChannel";
import SubscriptionSkeleton from "../../components/skeleton/SubscriptionSkeleton";

const Subscriptions = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSubscriptionsChannel());
  }, [dispatch]);

  const {channels, loading} = useSelector(state => state.subscriptionsChannel);

  return (
    <div>
      {
        !loading ? channels.map((channel, index) => <VideoChannel subscriptionStatus={true} key={index} channel={channel} />) : [...Array(15)].map((_, index) => <SubscriptionSkeleton key={index} />)
      }
    </div>
  )
}

export default Subscriptions;