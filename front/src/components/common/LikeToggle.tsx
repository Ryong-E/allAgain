import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import LikeIconOn from "../../assets/images/icons/icon_like_on.png"
import LikeIconOff from "../../assets/images/icons/icon_like_off.png"

const LikeButton = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  background: url(${LikeIconOff}) no-repeat 50% 50%/contain;
  transition: all .3s;
  &:hover {
    transform: scale(.9);
  }
  &.active {
    background-image: url(${LikeIconOn})
  }
`

export default function LikeToggle() {

  const [isActive, setIsActive] = useState(false);

  const handleOnChange = () => {
    setIsActive(prev => !prev);
  }

  return (
    <div>
      <LikeButton className={isActive ? "active" : ""} onClick={handleOnChange}></LikeButton>
      
    </div>
  )
}