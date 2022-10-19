import { useMutation } from "@tanstack/react-query";
import { getFeedByUserId } from "../../api/feedApi";
import { FeedType } from "../../types/feedTypes";
import FeedAddButton from "../Feed/FeedAddButton";
import FeedList from "../Feed/FeedList";

interface UserFeedListProps {
  isLike?: boolean;
  isMyDetail?: boolean;
  userId: string;
}

function UserFeedList({ isLike, isMyDetail, userId }: UserFeedListProps) {
  const { isSuccess, data } = useMutation(["UserDetail"], getFeedByUserId);
  return (
    <div>
      {isMyDetail && <FeedAddButton />}
      {isSuccess && <FeedList feeds={data} isSimple={true} />}
    </div>
  );
}

export default UserFeedList;
