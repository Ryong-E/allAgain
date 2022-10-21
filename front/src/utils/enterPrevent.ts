import { KeyboardEvent } from "react";

export function onCheckEnter(
  e: KeyboardEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>
) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
}
