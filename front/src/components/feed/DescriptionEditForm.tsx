import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { FeedFormValues } from "../../types/feedTypes";
import AuthorInfo from "./AuthorInfo";

interface DescriptionEditFormProps {
  description: string;
  register: UseFormRegister<FeedFormValues>;
}

function DescriptionEditForm({
  register,
  description,
}: DescriptionEditFormProps) {
  return (
    <DescriptionContainer>
      <DescriptionHeader>
        <AuthorInfo size="detail" userId={132132} />
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

export default DescriptionEditForm;
