import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import LikeIconOn from "../../assets/images/icons/icon_like_on.png"
import LikeIconOff from "../../assets/images/icons/icon_like_off.png"

const LikeLabel = styled.label`
  display: block;
  width: 30px;
  height: 30px;
  background: url(${LikeIconOff}) no-repeat 50% 50%/contain;
  text-indent: -99999px;
  font-size: 0;
  transition: all .3s;
  cursor: pointer;

  & + input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  &:hover {
    transform: scale(.9);
  }

  &.active {
    background-image: url(${LikeIconOn})
  }

`;


export default function LikeToggle() {

  const [isActive, setIsActive] = useState(false);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setIsActive(!isActive);
  }

  return (
    <div>
      <LikeLabel 
        htmlFor="LikeToggle" 
        className={isActive ? "active" : ""}>좋아요</LikeLabel>
      <input 
        id="LikeToggle"
        type="checkbox" 
        checked={isActive}
        onChange={handleOnChange}
      />
    </div>
  )
}