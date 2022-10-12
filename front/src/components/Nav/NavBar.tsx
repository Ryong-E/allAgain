import styled from "styled-components";
import { NavLink } from "react-router-dom";

let activeStyle = {
  textDecoration: "underline",
};

let activeClassName = "underline";

const NavListWrap = styled.nav`
  width: 100%;
  height: 100%;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const NavListLi = styled.li`
  padding: 10px;
  margin: 0 60px;

  a {
    color: ${({ theme }) => theme.colors.brown};
    font-size: 17px;
    font-weight: 500;
  }
`

export default function NavBar() {
  
  return (
    <NavListWrap>
      <NavList>
        <NavListLi>
          <NavLink
            to="feeds"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            피드
          </NavLink>
        </NavListLi>
        <NavListLi>
          <NavLink
            to="campaigns"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            캠페인
          </NavLink>
        </NavListLi>
      </NavList>
    </NavListWrap>
  );
}