import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GET_CAMPAIGNLIST } from '../../constant/queryKeys';
import { CampaignItemType } from '../../types/campaignTypes';

const TagListBox = styled.div`
  height: 70px;
  background: #f2eee3;
  display: inline-flex;
  align-items: center;
  padding: 0 30px;
  border-radius: 50px;
`;
const TagItemBox = styled.button`
  padding: 10px 16px;
  margin: 0 10px;
  border-radius: 50px;
  background: inherit;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lightBeige};
  transition: background .3s, color .3s;
  &.active {
    background: ${({ theme }) => theme.colors.dasidaGreen};
    color: ${({ theme }) => theme.colors.white};
  }
  &:not(.active):hover{
    background: #e0d8c0;
    color: ${({ theme }) => theme.colors.white};
  }
`;

interface PropsType {
  values : String[];
  currentValue : String;
  setCurrentValue : React.Dispatch<React.SetStateAction<string>>;
  data: CampaignItemType[] | undefined
}

export default function TagBox({values, currentValue, setCurrentValue, data}: PropsType) {
  const queryClient = useQueryClient();
  const handleChangeCurrentState = (e: React.MouseEvent<HTMLButtonElement>) => {
    const event = e.target as HTMLButtonElement;
    const { value } = event;
    if (value !== currentValue) {
      setCurrentValue(value);
    }
    
  };
  useEffect(()=>{
    queryClient.invalidateQueries([GET_CAMPAIGNLIST]);
  },[currentValue])
  return (
    <TagListBox>
      {values.map((element) => {
        const eleLength = data?.filter(obj => obj.status === element).length;
        return <TagItemBox 
          key={`${element}`}
          className={currentValue === element ? 'active' : ''}
          value={`${element}`} 
          onClick={handleChangeCurrentState}>
          {element} {eleLength}
        </TagItemBox>
      })}
    </TagListBox>
  );
}
