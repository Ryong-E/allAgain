import styled from 'styled-components';
import profileIcon from '../../assets/images/icons/icon_profile.png';

const UserImgWrap = styled.div`
  margin: 0 20px;
  height: 30px;
  width: 30px;
  flex-shrink: 0;
  border-radius:50%;
  border : 1px solid #666;
  overflow:hidden;
`
interface UserImgType{
  userImg ?: String;
}
export default function UserImgBox({userImg}: UserImgType) {
  return (
    <UserImgWrap className='userImgBox'>
      <img src={`http://${userImg}`} alt="" />
    </UserImgWrap>
  )
}
