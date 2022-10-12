import styled from 'styled-components';
import LikeToggle from '../common/LikeToggle';

interface likesCountProps {
  likes: number;
}

function LikesCount({ likes }: likesCountProps) {
  return (
    <Container>
      <LikeToggle />
      <Count>{likes}</Count>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 21px;
  height: 22px;
  display: flex;
  align-items: center;
`;

const Count = styled.div`
  margin-left: 8px;
  color: #000000;
  height: 19px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

export default LikesCount;
