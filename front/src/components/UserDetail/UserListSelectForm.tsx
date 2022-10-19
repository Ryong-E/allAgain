import React, { useState } from "react";
import UserFeedList from "./UserFeedList";

interface UserListSelectFormProps {
  userId: string;
  isMyDetail?: boolean;
}

function UserListSelectForm({ userId, isMyDetail }: UserListSelectFormProps) {
  const [selectedList, setSelectedList] = useState<string>("feed");
  const [isLike, setIsLike] = useState<boolean>(false);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedList(e.target.value);
  };

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLike(!isLike);
  };

  return (
    <div>
      <div>
        <button onClick={handleLikeClick}>Like</button>
      </div>
      <div>
        <input
          type="radio"
          id="feed"
          name="selectList"
          value="feed"
          onChange={handleRadioChange}
          defaultChecked></input>
        <input
          type="radio"
          id="champaign"
          name="selectList"
          value="champaign"
          onChange={handleRadioChange}></input>
      </div>
      {selectedList === "feed" && (
        <UserFeedList isLike={isLike} isMyDetail={isMyDetail} userId={userId} />
      )}
    </div>
  );
}

export default UserListSelectForm;
