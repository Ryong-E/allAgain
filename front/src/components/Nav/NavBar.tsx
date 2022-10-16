import styled from "styled-components";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useState } from "react";

interface NavIndicatorProps {
  posL: number,
  posR: number
}

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
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const NavListLi = styled.li`

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
  }
`;

const NavIndicator = styled.div<NavIndicatorProps>`
  position: absolute;
  left: ${(props) => props.posL + "px"};
  right: ${(props) => props.posR + "px"};
  bottom: -1px;
  height: 2px;
  background: ${({ theme }) => theme.colors.lightBeige};
`;



export default function NavBar() {

  const [indicatorPosX, stIndicatorPosX] = useState<number[]>([0, 300]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const posL = e.currentTarget.offsetLeft;
    const posR = 300 - (e.currentTarget.offsetLeft + e.currentTarget.offsetWidth);
    return stIndicatorPosX([posL, posR]);
  }
  
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
            <Link 
              to={ROUTE.ABOUT.link}
              onClick={handleClick}
              >다시, 다?
            </Link>
          </NavListLi>
          <NavListLi>
            <Link
              to={ ROUTE.FEED_LIST.link }
              onClick={handleClick}
            >
              피드
            </Link>
          </NavListLi>
          <NavListLi>
            <Link
              to={ ROUTE.CAMPAGIN_LIST.link }
              onClick={handleClick}
            >
              캠페인
            </Link>
          </NavListLi>
        </NavList>
        <NavIndicator posL={indicatorPosX[0]} posR={indicatorPosX[1]}/>
      </NavListWrap>
    </NavWrap>
  );
}