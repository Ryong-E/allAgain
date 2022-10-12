import styled from "styled-components"

const UserNameBox = styled.div`
  display: flex;
  align-items:center;
`

export default function UserName() {
  return (
    <UserNameBox className="userNameBox">
      <div className="userName">
        김다시
      </div>
      {/* 조건문 넣어주세요 */}
      <div className="isFamousUser">
        <img src="" alt="." />
      </div>
    </UserNameBox>
  )
}
