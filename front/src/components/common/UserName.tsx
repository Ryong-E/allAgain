import styled from "styled-components"

const UserNameBox = styled.div`
  display: flex;
  align-items:center;
`

interface userNameType{
  userName ?: String
}

export default function UserName({userName}:userNameType) {
  return (
    <UserNameBox className="userNameBox">
      <div className="userName">
        {userName}
      </div>
      {/* 조건문 넣어주세요 */}
      {/* <div className="isFamousUser">
        <img src="" alt="." />
      </div> */}
    </UserNameBox>
  )
}
