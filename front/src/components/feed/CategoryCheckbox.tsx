import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { FeedFormValues } from "../../types/feedTypes";
import CheckIconGreen from "../../assets/images/icons/icon_check_gr.png";

interface CategorySelectFormProps {
  isSelected: boolean;
  register: UseFormRegister<FeedFormValues>;
  checkboxValue: string;
  checkboxKey: string;
}

function CategoryCheckbox({
  register,
  isSelected,
  checkboxValue,
  checkboxKey,
}: CategorySelectFormProps) {
  const [selected, setSelected] = useState<boolean>(false);

  const handleOnClick = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  return (
    <>
      <CategoryLabel
        htmlFor={`category${checkboxKey}toggle`}
        className={selected ? "active" : ""}
        onClick={handleOnClick}>
        {checkboxValue}
      </CategoryLabel>
      <input
        id={`category${checkboxKey}toggle`}
        type="checkbox"
        defaultChecked={isSelected}
        {...register("category")}
        value={checkboxValue}
      />
    </>
  );
}

export default CategoryCheckbox;

const CategoryLabel = styled.label`
  background: ${({ theme }) => theme.colors.dasidaGreen};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.dasidaGreen};

  position: relative;
  display: block;
  width: 70px;
  border-radius: 60px;
  padding: 0px;
  font-size: 12px;
  text-align: center;
  margin-right: 7px;
  cursor: pointer;

  & + input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  &:before {
    display: none;
    content: "";
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translate(0, -50%);
    width: 0.9em;
    height: 0.9em;
    background: url(${CheckIconGreen}) no-repeat 50% 50% / contain;
    transition: all 0.3s;
  }

  &.active {
    color: ${({ theme }) => theme.colors.dasidaGreen};
    background: transparent;
    padding: 0 0 0 14px;
  }

  &.active:before {
    display: block;
  }
`;
