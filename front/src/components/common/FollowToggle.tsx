import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import CheckIconGreen from "../../assets/images/icons/icon_check_gr.png"
import CheckIconWhite from "../../assets/images/icons/icon_check_wh.png"

export default function FollowToggle() {

  // const FollowLabel = styled.label<{ checked: boolean }>`
  // background: ${({ checked }) => checked ? "transparent" : "#004D49"};
  // color: ${({ checked }) => checked ? "#004D49" : "#FFFFFF"};
  // border: 1px solid ${(props) => props.theme.colors.dasidaGreen};
  // padding: ${({ checked }) => checked ? "12px 30px 12px 55px" : "12px 30px"};

  const FollowLabel = styled.label`
    background: ${(props) => props.theme.colors.dasidaGreen};
    color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.dasidaGreen};

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
      color: ${(props) => props.theme.colors.dasidaGreen};
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

  const [isFollowed, setIsFollwed] = useState(false);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setIsFollwed(!isFollowed);
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