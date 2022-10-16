import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  padding: 170px 80px 100px;
  margin: 0 auto;
`;

export const Container1300 = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;

export const Container1200 = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageWrap = styled.div`
  padding: 70px 0 0;
`;

export const PageTitle = styled.h2`
  font-family: "RIDIBatang";
  text-align: center;
  background: #eae3d0;
  padding: 15px 0;
  color: ${({ theme }) => theme.colors.brown};
`;