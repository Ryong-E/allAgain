import * as ProfileStyle from "./Profile.style";
import ProfileForm from "./ProfileForm";
import ProfileImage from "./ProfileImage";


export default function Profile() {
  return (
    <>
      <ProfileImage />
      <ProfileForm />
      <ProfileStyle.WithdrawalButton>회원탈퇴</ProfileStyle.WithdrawalButton>
    </>
  )
};