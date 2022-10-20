import styled from 'styled-components';

const UserImgWrap = styled.div`
  margin: 0 20px;
  height: 30px;
  width: 30px;
  flex-shrink: 0;
  border-radius:50%;
  border : 1px solid #666;
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
      <img src={`http://${userImg}`} alt="" />
    </UserImgWrap>
  )
}
