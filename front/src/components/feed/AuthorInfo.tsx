import styled, { css } from "styled-components";
import FollowToggleSmall from "../common/FollowToggleSmall";
import DefaultProfileBanner from "../../assets/images/icons/icon_profile.png";
import CertifiedBadge from "../../assets/images/icons/icon_certified.png";

interface authorInfoProps {
  size: "simple" | "detail";
  nickname?: string;
  authorImageUrl?: string;
  userId: number;
  isAdmin?: boolean;
}

function AuthorInfo({
  size,
  userId,
  isAdmin,
  nickname,
  authorImageUrl,
}: authorInfoProps) {
  return (
    <Container isAdmin={isAdmin}>
      <ProfileContainer>
        <AuthorProfile
          size={size}
          src={authorImageUrl ? authorImageUrl : DefaultProfileBanner}
        />
        <AuthorName isAdmin={isAdmin}>{nickname}</AuthorName>
        {size === "simple" && <AuthorBadge src={CertifiedBadge} />}
      </ProfileContainer>
      {size === "simple" && <FollowToggleSmall isAdmin={isAdmin} />}
    </Container>
  );
}

AuthorInfo.defaultProps = {
  isAdmin: false,
};

const Container = styled.div<{ isAdmin?: boolean }>`
  width: ${(props) => props.isAdmin && "100%"};
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.isAdmin && "space-between"};
`;

const ProfileContainer = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
`;

const AuthorProfile = styled.img<{ size: "simple" | "detail" }>`
  width: 36px;
  height: 36px;
  ${(props) =>
    props.size === "simple"
      ? css`
          width: 36px;
          height: 36px;
          border-radius: 36px;
        `
      : css`
          width: 40px;
          height: 40px;
          border-radius: 40px;
        `}
  object-fit: cover;
  overflow: hidden;
`;

const AuthorName = styled.div<{ isAdmin?: boolean }>`
  margin: 0 0 0 14px;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => (props.isAdmin ? "#FFFFFF" : "#00000")};
`;

const AuthorBadge = styled.img`
  margin-left: 5px;
  margin-right: 14px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: #004d49;
  object-fit: cover;
`;

export default AuthorInfo;
