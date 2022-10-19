interface UserBannerProps {
  userId: string;
  imageUrl: string;
  nickname: string;
  isMyDetail?: boolean;
}

function UserBanner({
  userId,
  imageUrl,
  nickname,
  isMyDetail,
}: UserBannerProps) {
  return <div>{nickname}</div>;
}

export default UserBanner;
