import IconFeedActive from "../../assets/images/icons/icon_feed.png";
import IconFeedDisabled from "../../assets/images/icons/icon_feed_bei.png";
import IconCampaignActive from "../../assets/images/icons/icon_upcycle_br.png";
import IconCampaignDisabled from "../../assets/images/icons/icon_upcycle_bei.png";
import styled, { css } from "styled-components";

interface ListSelectTabProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListSelectTab({ isActive, setIsActive }: ListSelectTabProps) {
  return (
    <ToggleTabContainer>
      <ToggleTabButtonBox
        activeIcon={IconFeedActive}
        disabledIcon={IconFeedDisabled}
        isActive={isActive}>
        <button onClick={() => setIsActive(true)}>
          <i></i>피드
        </button>
      </ToggleTabButtonBox>
      <ToggleTabButtonBox
        activeIcon={IconCampaignActive}
        disabledIcon={IconCampaignDisabled}
        isActive={!isActive}>
        <button onClick={() => setIsActive(false)}>
          <i></i>캠페인
        </button>
      </ToggleTabButtonBox>
    </ToggleTabContainer>
  );
}

const ToggleTabContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(191, 177, 168, 0.5);
`;

const ToggleTabButtonBox = styled.div<{
  activeIcon: string;
  disabledIcon: string;
  isActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 107px;
  height: 50px;
  border-bottom: ${({ isActive }) => (isActive ? "4px solid #928b7a" : "none")};
  button {
    display: flex;
    align-items: center;
    border: none;
    background: inherit;
    cursor: pointer;
    font-size: 16px;
    color: ${({ isActive, theme }) =>
      isActive ? theme.colors.brown : "rgba(191, 177, 168, 0.5)"};
  }
  i {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 10px;
    ${({ isActive, activeIcon, disabledIcon }) =>
      isActive
        ? css`
            background-image: url(${activeIcon});
          `
        : css`
            background-image: url(${disabledIcon});
          `}
  }
  &:first-child {
    margin-right: 34px;
  }
`;

export default ListSelectTab;
