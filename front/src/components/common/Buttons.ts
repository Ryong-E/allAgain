import styled from "styled-components";
import addImageIcon from "../../assets/images/icons/icon_image_add.png";
import shareIcon from "../../assets/images/icons/icon_share.png";
import warningIcon from "../../assets/images/icons/icon_warning.png";

export const ButtonBlock = styled.div`
  display: flex;
  justify-conent: flex-start;
  align-items: center;
  margin: 80px 0 0;
`;

export const Button = styled.button`
  color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.boxShadowDefault};
  width: 120px;
  display: block;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  border: none;
  padding: 12px 30px;
  transition: all .3s;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }
`;

export const RoundedButton = styled(Button)`
  border-radius: ${(props) => props.theme.borderRadius.small}
`;

export const ConfirmButton = styled(RoundedButton)`
  background: ${(props) => props.theme.colors.lightGreen};

  &:hover {
    color: ${(props) => props.theme.colors.lightGreen};
    background: #D1EDEB;
  }
`;

export const DelButton = styled(RoundedButton)`
  background: ${(props) => props.theme.colors.error};

  &:hover {
    color: ${(props) => props.theme.colors.error};
    background: #F3CAC5;
  }
`;

export const ClsButton = styled(RoundedButton)`
  background: ${(props) => props.theme.colors.bodyText};

  &:hover {
    color: ${(props) => props.theme.colors.bodyText};
    background: #BBC3D2;
  }
`;

export const LargeButton = styled(RoundedButton)`
  background: ${(props) => props.theme.colors.dasidaGreen};
  width: 420px;
  font-size: 18px;
  padding: 15px;

  &:hover {
    background: ${(props) => props.theme.colors.bodyText};
  }
`;

export const AddImageButton = styled(RoundedButton)`
  position: relative;
  background: ${(props) => props.theme.colors.darkBeige};
  width: 160px;
  padding: 12px 30px 12px 60px;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translate(0, -45%);
    width: 2em;
    height: 2em;
    background: url(${addImageIcon}) no-repeat 50% 50%/contain;
    transition: all .3s;
  }

  &:hover {
    background: ${(props) => props.theme.colors.brown};
    color: ${(props) => props.theme.colors.brown};
  }

  &:hover:after {
    left: 50%;
    transform: translate(-50%, -45%);
  }
`;

export const SaveButton = styled(Button)`
  background: ${(props) => props.theme.colors.lightBeige};
  
  &:hover {
    background: ${(props) => props.theme.colors.dasidaGreen};
  }
`;

export const UtilButton = styled.button`
  display: block;
  width: 24px;
  height: 24px;
  background: no-repeat 50% 50%/contain;
  border: none;
  transition: all .3s;
  cursor: pointer;
`;

export const ShareButton = styled(UtilButton)`
  background-image: url(${shareIcon});
`
export const WarningButton = styled(UtilButton)`
  background-image: url(${warningIcon});
`





