import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { FeedFormValues } from "../../types/feedTypes";

interface CategorySelectFormProps {
  category: string;
  register: UseFormRegister<FeedFormValues>;
}

function CategorySelectForm({ register, category }: CategorySelectFormProps) {
  return (
    <CategoryFormContainer>
      <CategoryInput
        type="text"
        defaultValue={category && category}
        placeholder=",으로 구분하여 카테고리를 입력해 주세요.."
        {...register("category", {
          required: "최소 1개 이상의 카테고리가 필요합니다.",
        })}
      />
    </CategoryFormContainer>
  );
}

const CategoryFormContainer = styled.div`
  width: 1200px;
  padding: 14px 45px 14px 45px;
  min-height: 49px;
  background-color: #004d49;
  display: flex;
  margin-bottom: 43px;
`;

const CategoryInput = styled.input`
  color: #ffffff;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  width: 100%;
  text-align: left;
  margin-right: 15px;
  &:last-child {
    margin-right: 0px;
  }
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  &:focus {
    outline: none;
  }
`;

export default CategorySelectForm;
