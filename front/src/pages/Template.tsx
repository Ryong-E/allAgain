import { Container, Container1200, Container1300 } from "../components/common/Containers";
import { InputBlock, InputText, Label, InputErrorMsg, Textarea } from "../components/common/Form"
import { ButtonBlock, ConfirmButton, DelButton, ClsButton, SaveButton, LargeButton, AddImageButton, ShareButton, WarningButton } from "../components/common/Buttons"
import FollowToggle from "../components/common/FollowToggle";
import FollowToggleSmall from "../components/common/FollowToggleSmall";
import LikeListToggle from "../components/common/LikeListToggle";
import LikeToggle from "../components/common/LikeToggle";

export default function Template() {
  return (
    <>
      <Container>
        기본 폰트는 Noto Sans KR 입니다.

        <InputBlock>
          <InputText placeholder="내용을 입력하세요"/>
        </InputBlock>

        <InputBlock>
          <Label>이메일</Label>
          <InputText />
          <InputErrorMsg>중복된 이메일입니다.</InputErrorMsg>
        </InputBlock>

        <InputBlock>
          <Textarea placeholder="내용을 입력하세요"/>
        </InputBlock>

        <h2>Buttons.ts안에 버튼들</h2>
        <ButtonBlock>
          <ConfirmButton>완료</ConfirmButton>
          <DelButton>삭제</DelButton>
          <ClsButton>취소</ClsButton>
          <SaveButton>저장</SaveButton>
          <AddImageButton>사진 추가</AddImageButton>
          <ShareButton />
          <WarningButton />
        </ButtonBlock>
        <ButtonBlock>
          <LargeButton>로그인</LargeButton>
        </ButtonBlock>
        <br />
        <br />
        <br />
        <h2>토글 버튼들</h2>
          <FollowToggle />
          <FollowToggleSmall />
          <LikeListToggle />
          <LikeToggle />
      </Container>
    </>
  )
}