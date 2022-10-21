import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ShareButton } from "./Buttons";

const ShareRoot = styled.div`
  position: relative;
  z-index: 5;
`;


interface ContentIdType {
  contentId: number;
}

export default function ShareBox({ contentId }: ContentIdType) {
  const [isClick, setIsClick] = useState(false);
  const currentUrl = window.location.href;

  const linkCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          alert("복사를 다시 시도해주세요.");
        });
    } else {
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "absolute";
      textarea.style.width = "1px";
      textarea.style.height = "1px";
      textarea.style.margin = "-1px";
      textarea.style.clip = "rect(0,0,0,0)";
      textarea.style.overflow = "hidden";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("클립보드에 복사되었습니다.");
    }
  };

  
  
  return (
    <>
      <ShareButton  onClick={() => linkCopy( !contentId ? `${currentUrl}` : `${currentUrl}/${contentId}` )}  />
    </>
  );
}
