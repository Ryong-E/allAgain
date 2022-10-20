import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../constant/route";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const isToken = sessionStorage.getItem("jwtToken");

    if (!isToken) {
      alert("로그인이 필요한 서비스입니다.");
      navigate(ROUTE.LOGIN.link);
    }
  }, []);

  return <div>Auth</div>;
}
