import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../Nav/NavBar';
import { ROUTE } from '../../constant/route';
import HeaderUtils from './HeaderUtils';

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgba(191, 177, 186, .5);
  z-index: 1000;
`;

const HeaderContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 0 80px;
`;

const Logo = styled.div`
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

    font-family: 'SANGJUGyeongcheonIsland';
    font-size: 28px;
  }
`;

const LandingHeader = styled.header`
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

const LandingHeaderBtnWrap = styled.div`
  background: #496B7B;
  color: #ffffff;
  width: 180px;
  padding: 12px;
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-family: 'MapoFlowerIsland';
  font-size: 17px;

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const HeaderLoginBtnWrap = styled.div`
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
      height: .8em; 
      background: #343434;
    }
  }
`;


export default function Header( props: any ) {

  const location = useLocation();
  const pathName = location.pathname;

  const isToken = localStorage.getItem("jwtToken");


  return (
      pathName !== "/landing" ? (
          <HeaderWrap>
          <HeaderContainer>
            <Logo>
              <Link to={ROUTE.HOME.link}>ㄷㅅ, ㄷ</Link>
            </Logo>
            <NavBar />
            {
              isToken ? (
                <HeaderUtils />
              ) : (
                <HeaderLoginBtnWrap>
                   <Link to={ROUTE.LOGIN.link}>로그인</Link>
                   <Link to={ROUTE.REGISTER.link}>회원가입</Link>
                </HeaderLoginBtnWrap>
              )
            }
          </HeaderContainer>
        </HeaderWrap>
      ) : (
        <LandingHeader>
          <LandingHeaderBtnWrap>
            <Link to={ROUTE.LOGIN.link}>다시, 다 사용하기</Link>
          </LandingHeaderBtnWrap>
        </ LandingHeader>
      )

  );
}
