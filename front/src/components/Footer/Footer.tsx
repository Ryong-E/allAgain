import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../common/Containers';

const FooterWrap = styled.footer`
  background: ${({ theme }) => theme.colors.lightBeige};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 300;
  height: 50px;

  ${Container} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
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
  return (
    <FooterWrap>
      <Container>
        <Copyright>다시, 다 &copy; 2022</Copyright>
        <FooterLinkWrap>
          <li>
            <Link to='/landing'>서비스 소개</Link>
          </li>
          <li>
            <Link to='/team-intro'>팀 소개</Link>
          </li>
        </FooterLinkWrap>
      </Container>
    </FooterWrap>
  );
}
