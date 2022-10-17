import styled from "styled-components";
import userIcon from "../../assets/images/icons/icon_user.png";
import passwordIcon from "../../assets/images/icons/icon_lock.png";
import nameIcon from "../../assets/images/icons/icon_name.png";
import nicknameIcon from "../../assets/images/icons/icon_nick.png";

export const InputBlock = styled.div`
  margin: 0 0 40px;
`;

export const InputIconBlock = styled.div`
  position: relative;
`;

export const InputText = styled.input`
  box-shadow: ${({ theme }) => theme.boxShadowDefault};

  font-family: inherit;
  font-size: inherit;
  color: inherit;
  display: block;
  width: 100%;
  max-width: 1000px;
  padding: 15px 20px;
  border: none;
  background: #FFFFFF;

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.placeholder};
    color:  ${({ theme }) => theme.colors.placeholder};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.dasidaGreen};
  }

`;

export const InputIconText = styled(InputText)`
  padding: 20px 20px 20px 60px;
`

const iconUrl: any = {
  user: userIcon,
  password: passwordIcon,
  name: nameIcon,
  nick: nicknameIcon
}
// 객체안에 객체 만들어서 사용할 컴포넌트에서 imoport해서 쓰기 or
// iconUrl에서 key만 뽑아서 import해서 쓰기

export const InputIcon = styled.span<{ iconStyle: string }>`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
  width: 24px;
  height: 24px;
  background: no-repeat 50% 50%/contain;
  background-image: url(${(props) => iconUrl[props.iconStyle]})
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  width: 100%;
  min-height: 140px;
  padding: 15px 20px;
  border: none;
  background: #FFFFFF;
  box-shadow: ${({ theme }) => theme.boxShadowDefault};
  resize: none;

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.placeholder};
    color:  ${({ theme }) => theme.colors.placeholder};
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.dasidaGreen};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #666666;
  margin-bottom: 15px;
`;

export const InputErrorMsg = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
  padding: 10px;
`;

export const Checkbox = styled.input`

`;

