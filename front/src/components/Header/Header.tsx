import { Link, useLocation } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import { ROUTE } from "../../constant/route";
import HeaderUtils from "./HeaderUtils";
import * as StyledHeader from "./Header.style";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



export default function Header() {
  const location = useLocation();
  const pathName = location.pathname;
  
  const headerRef = useRef<any>(null);

  const isToken = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    const target = headerRef.current;

    const showAnim = gsap.from(target, { 
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);
    
    ScrollTrigger.create({
      start: "top -80",
      end: 99999,
      toggleClass: {targets: target, className: "scrolled"},
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    });
        
  }, [pathName]);

  return pathName !== ROUTE.LANDING.link ? (
    <StyledHeader.HeaderWrap ref={headerRef} className={pathName !== ROUTE.HOME.link ? "" : "main-header"}>
      <StyledHeader.HeaderContainer>
        <StyledHeader.Logo>
          <Link to={ROUTE.HOME.link}>ㄷㅅ, ㄷ</Link>
        </StyledHeader.Logo>
        <NavBar />
        {isToken ? (
          <HeaderUtils />
        ) : (
          <StyledHeader.HeaderLoginBtnWrap>
            <Link to={ROUTE.LOGIN.link}>로그인</Link>
            <Link to={ROUTE.REGISTER.link}>회원가입</Link>
          </StyledHeader.HeaderLoginBtnWrap>
        )}
      </StyledHeader.HeaderContainer>
    </StyledHeader.HeaderWrap>
  ) : (
    <StyledHeader.LandingHeader>
      <StyledHeader.LandingHeaderBtnWrap>
        <Link to={ROUTE.LOGIN.link}>다시, 다 사용하기</Link>
        <span></span>
        <span></span>
        <span></span>
      </StyledHeader.LandingHeaderBtnWrap>
    </StyledHeader.LandingHeader>
  );
}
