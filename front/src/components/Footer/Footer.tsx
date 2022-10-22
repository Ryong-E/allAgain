import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../common/Containers';
import { ROUTE } from '../../constant/route';

const FooterWrap = styled.footer`
  background: #56544e;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 300;
  height: 50px;

  &.bg-dark {
    background: #222222;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 80px;
`;

const Copyright = styled.p``;

const FooterLinkWrap = styled.ul`
  display: flex;
  justify-content: flex-end;

  li + li {
    margin-left: 30px;
  }
`;

export default function Footer() {

  const location = useLocation();
  const pathName = location.pathname;

  return (
    <FooterWrap className={pathName === ROUTE.LANDING.link ? "bg-dark" : ""}>
      <FooterContainer>
        <Copyright>다시, 다 &copy; 2022</Copyright>
        <FooterLinkWrap>
          <li>
            <Link to={ROUTE.LANDING.link}>서비스 소개</Link>
          </li>
          <li>
            <Link to={ROUTE.ABOUT_TEAM.link}>팀 소개</Link>
          </li>
        </FooterLinkWrap>
      </FooterContainer>
    </FooterWrap>
  );
}
