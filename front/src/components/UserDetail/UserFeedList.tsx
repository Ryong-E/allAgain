import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
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
    <ListContainer>
      <AddButtonContainer>
        {isMyDetail && (
          <AddPos>
            <FeedAddButton />
          </AddPos>
        )}
      </AddButtonContainer>

      {isSuccess && (
        <FeedList
          feeds={
            isLike
              ? data.filter(({ likes }) => {
                  if (likes?.find((like) => String(like.userId) === userId))
                    return true;
                  return false;
                })
              : data
          }
          isSimple={true}
        />
      )}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
`;

const AddButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
`;

const AddPos = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
`;

export default UserFeedList;
