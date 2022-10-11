import styled from "styled-components";

export const InputBlock = styled.div`
  padding: 0 0 40px;
`;

export const InputText = styled.input`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  display: block;
  width: 100%;
  max-width: 420px;
  padding: 15px 20px;
  border: none;
  background: #FFFFFF;
  box-shadow: ${(props) => props.theme.boxShadowDefault};

  &::placeholder {
    font-size: ${(props) => props.theme.fontSizes.placeholder};
    color:  ${(props) => props.theme.colors.placeholder};
  }
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
  box-shadow: ${(props) => props.theme.boxShadowDefault};
  resize: none;

  &::placeholder {
    font-size: ${(props) => props.theme.fontSizes.placeholder};
    color:  ${(props) => props.theme.colors.placeholder};
  }
`;

export const Label = styled.label`
  display: block;
  color: #666666;
  margin-bottom: 15px;
`;

export const InputErrorMsg = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.error};
  padding: 10px;
`;

export const Checkbox = styled.input`

`;

