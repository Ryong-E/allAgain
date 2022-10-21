import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useEffect, useState } from "react";

const NavWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MenuButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 16px;

  span {
    width: 80%;
    height: 2px;
    background: ${({ theme }) => theme.colors.lightBeige};
  }
`

const NavListWrap = styled.nav`
  position: relative;
  width: 300px;
  height: 100%;
  margin-left: 20px;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavListLi = styled.li`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  & + & {
    margin-left: 20px;
  }

  a {
    display: block;
    padding: 10px;
    color: ${({ theme }) => theme.colors.brown};

    &:hover {
      font-weight: 500;
    }

    &:after {
      display: none;
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      width: 3em;
      height: 2px;
      background: ${({ theme }) => theme.colors.lightBeige};
    }
  }

  a.activeNavLink {
    &:after {
      display: block;
    }
  }

`;



export default function NavBar() {


  return (
    <NavWrap>
      <MenuButton>
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>
      <NavListWrap>
        <NavList>
          <NavListLi>
            <NavLink 
              to={ROUTE.LANDING.link}
              >다시, 다?
            </NavLink>
          </NavListLi>
          <NavListLi>
            <NavLink
              to={ ROUTE.FEED_LIST.link }
              className={({ isActive }) => isActive ? "activeNavLink" : undefined}
            >
              피드
            </NavLink>
          </NavListLi>
          <NavListLi>
            <NavLink
              to={ ROUTE.CAMPAGIN_LIST.link }
              className={({ isActive }) => isActive ? "activeNavLink" : undefined}
            >
              캠페인
            </NavLink>
          </NavListLi>
        </NavList>
      </NavListWrap>
    </NavWrap>
  );
}