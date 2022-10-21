import { KeyboardEvent } from "react";

export function onCheckEnter(e: KeyboardEvent<HTMLFormElement>){
    if(e.key === 'Enter'){
      e.preventDefault();
    }
}