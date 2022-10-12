import styled from 'styled-components';
import userIcon from '../../assets/images/icons/icon_user.png';

const UserImgWrap = styled.div`
  margin: 0 20px;
  height: 30px;
  width: 30px;
  flex-shrink: 0;
`

export default function UserImgBox() {
  return (
    <UserImgWrap className='userImgBox'>
      <img src={userIcon} alt="" />
    </UserImgWrap>
  )
}
