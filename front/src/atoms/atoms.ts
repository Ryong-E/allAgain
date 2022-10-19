import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loggedInUserId = atom<number | null>({
  key: "loggedInUserId",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const loggedInUserImgUrl = atom<String | null>({
  key: "loggedInUserImgUrl",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
