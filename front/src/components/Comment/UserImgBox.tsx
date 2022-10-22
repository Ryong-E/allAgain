import styled from 'styled-components';
import guestUserImg from "../../assets/images/icons/icon_profile.png";

const UserImgWrap = styled.div`
  margin: 0 20px;
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  border-radius:50%;
  border : 1px solid  rgb(231, 229, 224);
  overflow:hidden;
  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
`
interface UserImgType{
  userImg : String | null;
}
export default function UserImgBox({userImg}: UserImgType) {
  return (
    <UserImgWrap className='userImgBox'>
      <img src={userImg ?`http://${userImg}` : guestUserImg} alt="" />
    </UserImgWrap>
  )
}
