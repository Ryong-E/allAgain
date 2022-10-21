import { useQuery } from "@tanstack/react-query";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { getUserProfile } from "../../api/userApi";
import { FeedFormValues } from "../../types/feedTypes";
import AuthorInfo from "./AuthorInfo";
import { onCheckEnter } from "../../utils/enterPrevent";

interface DescriptionEditFormProps {
  description: string;
  register: UseFormRegister<FeedFormValues>;
  errors?: string;
  userId: number;
}

function DescriptionEditForm({
  register,
  description,
  errors,
  userId,
}: DescriptionEditFormProps) {
  const { data } = useQuery(["MyInfo"], getUserProfile);

  return (
    <DescriptionContainer>
      <DescriptionHeader>
        <AuthorInfo size="detail" userId={userId} isEditing={true} {...data} />
      </DescriptionHeader>
      <DescriptionSection
        defaultValue={description && description}
        placeholder="내용 작성.."
        {...register("description", {
          required: "내용을 작성해 주세요.",
          minLength: {
            value: 4,
            message: "내용은 최소 4글자 이상이여야 합니다.",
          },
        })}
      />
      <ValidateWarning>{errors}</ValidateWarning>
    </DescriptionContainer>
  );
}

const DescriptionContainer = styled.div`
  width: 1200px;
  padding: 40px 60px;
  background-color: #ffffff;
`;

const DescriptionHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const DescriptionSection = styled.textarea`
  margin-top: 25px;
  width: 100%;
  min-height: 131px;
  font-size: 15px;
  line-height: 36px;
  &:empty:before {
    content: "내용 작성..";
    color: #a9a9a9;
  }
  &:focus {
    outline: none;
  }
  border: 0;
`;

const ValidateWarning = styled.div`
  color: ${({ theme }) => theme.colors.error};
`;

export default DescriptionEditForm;
