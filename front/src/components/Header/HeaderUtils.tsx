import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import AlertIcon from "../../assets/images/icons/icon_alert.png";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MyProfile, User } from "../../types/userTypes";
import { GET_PROFILE } from "../../constant/queryKeys";
import { getUserProfile } from "../../api/userApi";
import { loggedInUserId } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

const HeaderUtilWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 80px;
  transform: translate(0, -50%);
  z-index: 10;

  display: flex;
  justify-content: flex-end;
`;

const HeaderUtilButton = styled.div`
  width: 34px;
  height: 34px;
  background: no-repeat 50% 50% / contain;
  cursor: pointer;

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
  background-size: 95%;
`;

const MeButton = styled(HeaderUtilButton)<User>`
  border-radius: 50%;
  border: 1px solid #e7e5e0;
  overflow: hidden;
  background-image: url(${(props) => props.imageUrl});
`;

const HeaderUtilBox = styled.div`
  position: absolute;
  top: 40px;
  right: -20px;
  width: 180px;
  padding: 20px 0;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: #fff;
  border: 1px solid #e7e5e0;
  box-shadow: 5px 5px 10px rgb(84, 79, 67, 0.15);

  li {
    padding: 8px 0;

    & > a {
      display: block;
      width: 100%;
      padding-left: 30px;
      transition: padding 0.3s, color 0.3s;
    }

    &:hover {
      background: #eff7f6;

      a {
        padding-left: 35px;
        color: ${({ theme }) => theme.colors.dasidaGreen};
        font-weight: 500;
      }
    }
  }
`;

export default function HeaderUtils() {
  const navigate = useNavigate();
  const [utilBox, setUtilBox] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loggedInUserId);
  const utilBoxRef = useRef<HTMLDivElement>(null);
  const utilButtonRef = useRef<HTMLDivElement>(null);

  // Utilbox 이외의 영역 클릭 시 Utilbox 닫힘
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (
        utilBoxRef.current &&
        !utilBoxRef.current.contains(e.target) &&
        !utilButtonRef.current?.contains(e.target)
      ) {
        setUtilBox(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [utilBoxRef]);

  const handleUtilBox = () => {
    setUtilBox(!utilBox);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLogin(null);
    navigate(ROUTE.LOGIN.link);
  };

  const [previewImage, setPreviewImage] = useState("");

  useQuery<MyProfile, Error>([GET_PROFILE], getUserProfile, {
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      const replaceUrl = data.imageUrl.replaceAll("\\", "/");
      setPreviewImage("http://" + replaceUrl);
    },
  });

  return (
    <HeaderUtilWrap>
      <NoticeButton />
      <MeButton
        ref={utilButtonRef}
        onClick={handleUtilBox}
        imageUrl={previewImage}
      />
      {utilBox && (
        <HeaderUtilBox ref={utilBoxRef}>
          <ul>
            <li>
              <Link to={ROUTE.MY_PAGE.link}>마이페이지</Link>
            </li>
            <li>
              <Link to={ROUTE.MY_PROFILE.link}>계정관리</Link>
            </li>
            <li>
              <Link to={ROUTE.LOGIN.link} onClick={handleLogout}>
                로그아웃
              </Link>
            </li>
          </ul>
        </HeaderUtilBox>
      )}
    </HeaderUtilWrap>
  );
}
