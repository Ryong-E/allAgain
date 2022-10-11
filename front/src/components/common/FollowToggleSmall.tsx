import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import CheckIconGreen from "../../assets/images/icons/icon_check_gr.png"
import CheckIconWhite from "../../assets/images/icons/icon_check_wh.png"

export default function FollowToggleSmall() {

  const FollowLabel = styled.label`
    background: ${(props) => props.theme.colors.dasidaGreen};
    color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.dasidaGreen};

    position: relative;
    display: block;
    width: 60px;
    border-radius: 60px;
    padding: 0px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;

    & + input[type="checkbox"] {
      display: none;
      visibility: hidden;
    }

    &:before {
      display: none;
      content: "";
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translate(0, -50%);
      width: .9em;
      height: .9em;
      background: url(${CheckIconGreen}) no-repeat 50% 50%/contain;
      transition: all .3s;
    }

    &.active {
      color: ${(props) => props.theme.colors.dasidaGreen};
      background: transparent;
      padding: 0 0 0 14px;
    }

    &.active:before {
      display: block;
    }

  `;

  const [isFollowed, setIsFollwed] = useState(false);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setIsFollwed(!isFollowed);
  }

  return (
    <div>
      <FollowLabel 
        htmlFor="followToggleSmall" 
        className={isFollowed ? "active" : ""}>팔로우</FollowLabel>
      <input 
        id="followToggleSmall"
        type="checkbox" 
        checked={isFollowed}
        onChange={handleOnChange}
      />
    </div>
  )
}