import styled from "styled-components";
import { InputText } from "../common/Form";
import { SaveButton } from "../common/Buttons";
import ProfileImage from "../../assets/images/icons/icon_profile.png";
import EditIcon from "../../assets/images/icons/icon_image_edit.png"

export const FormContainer = styled.form`
  padding: 170px 0 60px;
  margin: 0 auto;
`;

export const Container400 = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 40px;
  margin: 0 auto;
`;

export const ImageWrap = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 40px;
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50%/contain;
  background-image: url(${ProfileImage});
`;

export const EditImageButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(${EditIcon}) no-repeat 60% 50%/65%;
  background-color: ${({ theme }) => theme.colors.dasidaGreen};
  box-shadow: 5px 5px 10px rgb(231 225 210 / 100%);

`;

export const NickNameInput = styled(InputText)`
  text-align: center;
  font-size: 16px;
`;

export const InfoListWrap = styled.div`
  background: #f7f4ea;
  padding: 60px 0;
  margin: 60px 0 0;
`;

export const InfoList = styled.ul`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  & > li {
    display: flex;
    padding: 20px 0;

    span {
      width: 40%;
    }

    span + * {
      width: 60%;
    }
  }
`;

export const PwChangeBlock = styled.div`
  ${InputText} {

  }
`;

export const PwChangeInput = styled(InputText)`
  padding: 12px 15px;
  & + & {
    margin-top: 10px;
  }
`;

export const WithdrawalButton = styled.div`
  color: ${({ theme }) => theme.colors.lightBeige};
  text-align: right;
  padding: 40px 100px 80px;
`

export const SubmitButton = styled(SaveButton)`
  margin-top: 40px;
`;