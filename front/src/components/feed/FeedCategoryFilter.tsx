import React, { useState } from "react";
import styled, { css } from "styled-components";
import { SaveButton } from "../common/Buttons";

interface CategoryState {
  [key: string]: boolean;
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

const initialState: CategoryState = {
  all: true,
  plastic: false,
  fiber: false,
  wood: false,
  paper: false,
  glass: false,
  metal: false,
  rubber: false,
  etc: false,
};

function FeedCategoryFilter() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryState>(initialState);

  const handleCategoryButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const eventValue = (event.target as HTMLButtonElement).value;
    if (eventValue !== "all")
      setSelectedCategory({
        ...selectedCategory,
        [eventValue]: !selectedCategory[eventValue],
        all: false,
      });
    else setSelectedCategory(initialState);
  };

  return (
    <CategoryButtonContainer>
      {Object.entries(CategoryList).map(([key, value]) => (
        <CategoryButton
          key={key}
          value={key}
          selectedCategory={selectedCategory}
          onClick={handleCategoryButtonClick}>
          {value}
        </CategoryButton>
      ))}
    </CategoryButtonContainer>
  );
}

const CategoryButtonContainer = styled.div`
  width: 810px;
  height: 71px;
  background-color: #f2eee3;
  border-radius: 5px;
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
  border-radius: 5px;
  box-shadow: none;
  ${(props) =>
    props.selectedCategory[props.value] === true
      ? css`
          background-color: #afa58d;
          color: #ffffff;
        `
      : css`
          background-color: rgba(0, 0, 0, 0);
          color: #928b7a;
        `}
  &:hover {
    color: #ffffff;
  }
`;

export default FeedCategoryFilter;
