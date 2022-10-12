import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../common/Containers';
import NavBar from '../Nav/NavBar';

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 1000;

  ${Container} {
    position: relative;
    height: 100%;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: 80px;
  transform: translate(0, -50%);
  width: 200px;
  height: 70px;
  background: #e0d4b7;
  cursor: pointer;
  z-index: 10;

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const HeaderBtns = styled.div``;

export default function Header() {
  return (
    <HeaderWrap>
      <Container>
        <Logo>
          <Link to='/' />
        </Logo>
        <NavBar />
        <HeaderBtns></HeaderBtns>
      </Container>
    </HeaderWrap>
  );
}
