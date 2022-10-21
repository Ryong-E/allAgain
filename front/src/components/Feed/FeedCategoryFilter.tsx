import React from "react";
import styled, { css } from "styled-components";
import { SaveButton } from "../common/Buttons";

interface CategoryState {
  [key: string]: boolean;
}

interface FeedCategoryFilterProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedCategory: CategoryState;
}

const CategoryList = {
  all: "전체",
  plastic: "플라스틱",
  fiber: "섬유",
  wood: "나무",
  paper: "종이류",
  glass: "유리",
  metal: "금속",
  rubber: "고무",
  etc: "그 외",
};

function FeedCategoryFilter({
  onClick,
  selectedCategory,
}: FeedCategoryFilterProps) {
  return (
    <CategoryButtonContainer>
      {Object.entries(CategoryList).map(([key, value]) => (
        <CategoryButton
          key={key}
          value={value}
          selectedCategory={selectedCategory}
          onClick={onClick}>
          {value}
        </CategoryButton>
      ))}
    </CategoryButtonContainer>
  );
}

const CategoryButtonContainer = styled.div`
  width: calc(100% - 70px);
  height: 66px;
  background-color: #f2eee3;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const CategoryButton = styled(SaveButton)<{
  value: string;
  selectedCategory: CategoryState;
}>`
  width: auto;
  height: 35px;
  font-size: 16px;
  padding: 0 18px;
  border-radius: 50px;
  box-shadow: none;
  margin: 0;
  ${(props) =>
    props.selectedCategory[props.value] === true
      ? css`
          background-color: ${({ theme }) => theme.colors.dasidaGreen};
          color: #ffffff;
        `
      : css`
          background-color: rgba(0, 0, 0, 0);
          color: #928b7a;
        `}
  &:hover {
    background: #e0d8c0;
    color: #ffffff;
  }
  transition: all 0.3s;
`;

export default FeedCategoryFilter;
