import styled, { keyframes } from "styled-components";

export const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: "SANGJUGyeongcheonIsland";
    font-size: 28px;
    transition: ease .4s;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: .7em;
    right: -.8em;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.dasidaGreen};
  }
`;

export const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1460px;
  height: 70px;
  border-bottom: 1px solid rgba(191, 177, 186, 0.5);
  transition: ease .4s;
  z-index: 1000;

  &.scrolled {
    background: #F9F7F2;
  }

  &.main-header {
    border: none;

    ${Logo} {
      a {
        font-size: 36px;
      }

      &:after {
        bottom: 0.95em;
        right: -.8em;
        width: 8px;
        height: 8px;
      }
    }
  }


`;

export const HeaderContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 0 80px;
`;


export const LandingHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 40px;
  z-index: 1000;
`;

export const buttonAni = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
  80% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
  84% {
    opacity: 0.2;
  }
  94% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(18);
  }
`;

export const LandingHeaderBtnWrap = styled.div`
  position: relative;
  background: rgba(73, 107, 123, 0.9);
  color: #ffffff;
  width: 180px;
  text-align: center;
  font-weight: 300;
  border-radius: ${({ theme }) => theme.borderRadius.small};

  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 12px;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.2);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    animation: ${buttonAni} 6s infinite ease-out;
    opacity: 0;

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.6s;
    }
  }
`;

export const HeaderLoginBtnWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 80px;
  transform: translate(0, -50%);
  z-index: 10;

  display: flex;
  justify-content: flex-end;

  a {
    position: relative;
    margin-left: 25px;

    &:hover {
      color: ${({ theme }) => theme.colors.dasidaGreen};
      font-weight: 500;
    }

    &:last-child:before {
      content: "";
      position: absolute;
      top: 50%;
      left: -12.5px;
      transform: translate(0, -45%);
      width: 1px;
      height: 0.8em;
      background: #343434;
    }
  }
`;