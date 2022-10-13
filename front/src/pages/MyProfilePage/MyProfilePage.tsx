import { Container, Container1300 } from '../../components/common/Containers';
import { getUserProfile } from '../../api/userApi';
import { useQuery } from '@tanstack/react-query';

export function MyProfilePage() {

  const data = getUserProfile({ nickname: "팀" });
  console.log(data);

  // const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
  //   getUserProfile(nickname);
  // );

  return (
    <Container>
      <Container1300>
        계정관리
      </Container1300>
    </Container>
  )
}

export default MyProfilePage;