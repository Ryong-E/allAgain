import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import CheckIconGreen from "../../assets/images/icons/icon_check_gr.png"
import CheckIconWhite from "../../assets/images/icons/icon_check_wh.png"
import { useRecoilState } from "recoil";
import { loggedInUserId } from "../../atoms/atoms";

 // const FollowLabel = styled.label<{ checked: boolean }>`
  // background: ${({ checked }) => checked ? "transparent" : "#004D49"};
  // color: ${({ checked }) => checked ? "#004D49" : "#FFFFFF"};
  // border: 1px solid ${({ theme }) => theme.colors.dasidaGreen};
  // padding: ${({ checked }) => checked ? "12px 30px 12px 55px" : "12px 30px"};

const FollowLabel = styled.label`
  background: ${({ theme }) => theme.colors.dasidaGreen};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.dasidaGreen};

  position: relative;
  display: block;
  width: 160px;
  padding: 12px 30px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all .4s .2s;

  & + input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  &:before {
    opacity: 0;
    content: "";
    position: absolute;
    top: 50%;
    left: 35px;
    transform: translate(0, -50%);
    width: 1.1em;
    height: 1.1em;
    background: url(${CheckIconGreen}) no-repeat 50% 50%/contain;
    transition: all .3s;
  }

  &:hover {
    padding: 12px 30px 12px 55px;
  }

  &:hover:before {
    opacity: 1;
    background-image: url(${CheckIconWhite});
    transition: all .4s .2s;
  }

  &.active {
    color: ${({ theme }) => theme.colors.dasidaGreen};
    background: transparent;
    padding: 12px 30px 12px 55px;
  }

  &.active:before {
    opacity: 1;
    background-image: url(${CheckIconGreen})
  }

  &.active:hover:before {
    background-image: url(${CheckIconGreen})
  }

`;

export default function FollowToggle() {
  const [currentUser,setCurrentUser] = useRecoilState(loggedInUserId)
  const [isFollowed, setIsFollwed] = useState(false);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if(currentUser){
      setIsFollwed(!isFollowed);
    }
    else{
      alert("로그인 후 이용가능합니다.")
    }
  }

  return (
    <div>
      <FollowLabel 
        htmlFor="followToggle" 
        // checked={isFollowed}
        className={isFollowed ? "active" : ""}>팔로우</FollowLabel>
      <input
        id="followToggle"
        type="checkbox" 
        checked={isFollowed}
        onChange={handleOnChange}
      />
    </div>
  )
}