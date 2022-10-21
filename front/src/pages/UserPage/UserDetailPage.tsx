import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getUserProfileById } from "../../api/userApi";
import { loggedInUserId } from "../../atoms/atoms";
import UserBanner from "../../components/UserDetail/UserBanner";
import UserListSelectForm from "../../components/UserDetail/UserListSelectForm";

function UserPage() {
  const { id } = useParams();
  const currentUserId = useRecoilValue(loggedInUserId);
  const navigator = useNavigate();

  const userQuery = useQuery(
    ["userProfile", id],
    () => getUserProfileById(id!, currentUserId),
    {
      refetchOnMount: true,
      onError: () => navigator(-1),
    }
  );
  return (
    <>
      {userQuery.isSuccess && (
        <UserBanner
          {...userQuery.data}
          userId={id!}
          isMyDetail={String(currentUserId) === id}
        />
      )}
      <UserListSelectForm
        userId={id!}
        isMyDetail={String(currentUserId) === id}
      />
    </>
  );
}

export default UserPage;
