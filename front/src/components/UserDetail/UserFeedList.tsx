import { useQuery } from "@tanstack/react-query";
import { getFeedByUserId } from "../../api/feedApi";
import FeedAddButton from "../Feed/FeedAddButton";
import FeedList from "../Feed/FeedList";

interface UserFeedListProps {
  isLike?: boolean;
  isMyDetail?: boolean;
  userId: string;
}

function UserFeedList({ isLike, isMyDetail, userId }: UserFeedListProps) {
  const { isSuccess, data } = useQuery(["UserDetail"], () =>
    getFeedByUserId(userId)
  );
  return (
    <div>
      {isMyDetail && <FeedAddButton />}
      {isSuccess && <FeedList feeds={data} isSimple={true} />}
    </div>
  );
}

export default UserFeedList;
