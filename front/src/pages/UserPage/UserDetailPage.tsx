import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getUserProfileById } from "../../api/userApi";
import { loggedInUserId } from "../../atoms/atoms";
import { Container } from "../../components/common/Containers";
import UserBanner from "../../components/UserDetail/UserBanner";
import UserListSelectForm from "../../components/UserDetail/UserListSelectForm";

function UserPage() {
  const { id } = useParams();
  const currentUserId = useRecoilValue(loggedInUserId);

  const { isSuccess, data } = useQuery(
    ["testProfile"],
    () => getUserProfileById(id!),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container>
      {isSuccess && (
        <UserBanner
          {...data}
          userId={id!}
          isMyDetail={String(currentUserId) === id}
        />
      )}
      <UserListSelectForm
        userId={id!}
        isMyDetail={String(currentUserId) === id}
      />
    </Container>
  );
}

export default UserPage;
