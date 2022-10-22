import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { FeedFormValues } from "../../types/feedTypes";
import CategoryCheckbox from "./CategoryCheckbox";

interface CategorySelectFormProps {
  category: string;
  register: UseFormRegister<FeedFormValues>;
  errors?: string;
}

const CategoryList = {
  plastic: "플라스틱",
  fiber: "섬유",
  wood: "나무",
  paper: "종이류",
  glass: "유리",
  metal: "금속",
  rubber: "고무",
  etc: "그 외",
};

function CategorySelectForm({
  register,
  category,
  errors,
}: CategorySelectFormProps) {
  return (
    <CategoryFormContainer>
      {errors ? (
        <ValidateWarning>{errors}</ValidateWarning>
      ) : (
        <div>카테고리를 선택해 주세요</div>
      )}
      <CategoryLabel>
        {Object.entries(CategoryList).map(([key, value]) => (
          <CategoryCheckbox
            register={register}
            isSelected={category.split(",").includes(value)}
            checkboxValue={value}
            checkboxKey={key}
            key={key}
          />
        ))}
      </CategoryLabel>
    </CategoryFormContainer>
  );
}

const CategoryFormContainer = styled.div`
  color: ${({ theme }) => theme.colors.dasidaGreen};
  font-weight: 500;
  width: 1200px;
  padding: 18px 60px 14px 60px;
  background-color: #f4f7f7;
  margin-bottom: 10px;
`;
const CategoryLabel = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
`;
const ValidateWarning = styled.div`
  color: ${({ theme }) => theme.colors.error};
`;

export default CategorySelectForm;
