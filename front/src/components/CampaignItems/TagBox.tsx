import React, { useState } from 'react';
import styled from 'styled-components';

const TagListBox = styled.div`
  width: 650px;
  height: 70px;
  background: #f2eee3;
  display: inline-flex;
  align-items: center;
  padding: 0 30px;
  border-radius: 5px;
`;
const TagItemBox = styled.button`
  padding: 10px 12px;
  margin: 0 10px;
  border-radius: 5px;
  background: inherit;
  color: ${({ theme }) => theme.colors.lightBeige};
  transition: background .3s, color .3s;
  &.active {
    background: ${({ theme }) => theme.colors.darkBeige};
    color: ${({ theme }) => theme.colors.white};
  }
  &:not(.active):hover{
    background: ${({ theme }) => theme.colors.dasidaGreen};
    color: ${({ theme }) => theme.colors.white};
  }
`;

interface PropsType {
  values : String[];
  currentValue : String;
  setCurrentValue : React.Dispatch<React.SetStateAction<string>>;
}

export default function TagBox({values, currentValue, setCurrentValue}: PropsType) {
  
  const handleChangeCurrentState = (e: React.MouseEvent<HTMLButtonElement>) => {
    const event = e.target as HTMLButtonElement;
    const { value } = event;
    if (value !== currentValue) {
      setCurrentValue(value);
    }
  };
  return (
    <TagListBox>
      {values.map((element) => (
        <TagItemBox 
          key={`${element}`}
          className={currentValue === element ? 'active' : ''}
          value={`${element}`} 
          onClick={handleChangeCurrentState}>
          {element}
        </TagItemBox>
      ))}
    </TagListBox>
  );
}
