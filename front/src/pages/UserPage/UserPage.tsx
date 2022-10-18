import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserProfileById } from "../../api/userApi";
import ProfileBanner from "../../components/Profile/ProfileBanner";

function UserPage() {
  const { id } = useParams();

  const { isSuccess, data } = useQuery(
    ["testProfile"],
    () => getUserProfileById(id!),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      <ProfileBanner {...data} />
    </div>
  );
}

export default UserPage;
