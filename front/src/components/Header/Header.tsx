import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../common/Containers';
import NavBar from '../Nav/NavBar';
import { ROUTE } from '../../constant/route';
import AlertIcon from "../../assets/images/icons/icon_alert.png";
import ProfileIcon from "../../assets/images/icons/icon_profile.png";

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgba(191, 177, 186, .5);
  z-index: 1000;

  ${Container} {
    position: relative;
    height: 100%;
    padding: 0 80px;
  }
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
    color: ${({ theme }) => theme.colors.bodyText};

  }
`;

const HeaderUtils = styled.div`
  position: absolute;
  top: 50%;
  right: 80px;
  transform: translate(0, -50%);
  z-index: 10;

  display: flex;
  justify-content: flex-end;


`;

const HeaderUtilButton = styled.div`
  width: 32px;
  height: 32px;
  background: no-repeat 50% 50%/contain;

  & + & {
    margin-left: 30px;
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const NoticeButton = styled(HeaderUtilButton)`
  background-image: url(${AlertIcon});
`;

const MeButton = styled(HeaderUtilButton)`
  background-image: url(${ProfileIcon});
`;




export default function Header() {
  return (
    <HeaderWrap>
      <Container>
        <Logo>
          <Link to={ROUTE.HOME.link}>ㄷㅅ, ㄷ</Link>
        </Logo>
        <NavBar />
        <HeaderUtils>
          <NoticeButton></NoticeButton>
          <MeButton>
            <Link to={ROUTE.MY_PROFILE.link} />
          </MeButton>
        </HeaderUtils>
      </Container>
    </HeaderWrap>
  );
}
