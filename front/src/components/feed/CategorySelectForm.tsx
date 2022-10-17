import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { FeedFormValues } from "../../types/feedTypes";
import CategoryCheckbox from "./CategoryCheckbox";

interface CategorySelectFormProps {
  category: string;
  register: UseFormRegister<FeedFormValues>;
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

function CategorySelectForm({ register, category }: CategorySelectFormProps) {
  return (
    <CategoryFormContainer>
      {Object.entries(CategoryList).map(([key, value]) => (
        <CategoryCheckbox
          register={register}
          isSelected={category.split(",").includes(value)}
          checkboxValue={value}
          checkboxKey={key}
        />
      ))}
    </CategoryFormContainer>
  );
}

const CategoryFormContainer = styled.div`
  width: 1200px;
  padding: 14px 45px 14px 45px;
  background-color: white;
  display: flex;
`;

export default CategorySelectForm;
