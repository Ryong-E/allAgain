import React, { ReactEventHandler, useEffect, useMemo, useRef, useState } from "react"
import styled, { css } from "styled-components";

const InputWrap = styled.div`
    position:relative;
    width:150px;
    height:48px;
    border:1px solid black;
    &.on{
        border:1px solid pink;
    }
    
`
const InputLabel = styled.label`
    position:absolute;
    top:0px;
    left:0px;
    transform:translateY(12px) translateX(15px) scale(1);
    &.on{
        transform:translateY(0px) translateX(10px) scale(0.7);
        color:purple;
    }
    transition:all 0.3s;

`
const DateInput = styled.input`
    height:100%;
    width:80%;
    padding-top:20px;
    border:none;
    transition:all 0.3s;
    outline:none;

`

export default function RecruitDate({children} :any){
    const dateRef = useRef<HTMLInputElement>(null);
    const dateLabelRef = useRef<HTMLLabelElement>(null);
    const [isClick,setIsClick] = useState(false);
    const [isWrite,setIsWrite] = useState(false);

    
    // useEffect(()=>{
    //     if(dateLabelRef.current !== null){
    //         if(isWrite){
    //             dateLabelRef.current.style.transform = 'translateY(0) translateX(10px) scale(0.8)'
    //         }
    //         else{
    //             dateLabelRef.current.style.transform = isClick ? 'translateY(0) translateX(10px) scale(0.8)' : 'translateY(12px) translateX(15px) scale(1)';
    //         }
    //     }
    // },[isClick])

    useEffect(()=>{
        if(dateRef.current !== null){
            console.log(isClick)
            if(isWrite){
                dateRef.current.style.opacity = "1";
            }
            else if (!isWrite){
                dateRef.current.style.opacity = isClick ? "1" : "0";
            }
        }
    },[isClick])

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.value)
        if(e.target.value !== ""){
            setIsWrite(true)
        }
        else{
            setIsWrite(false)
        }
    }
    return (
        <>
            <InputWrap className={isClick ? 'on' : 'off'}>
                <InputLabel htmlFor="date-pick" className={isClick ? 'on' : 'off'}>기간</InputLabel>
                <DateInput type="date" id="date-pick" onBlur={()=>{setIsClick(false)}} onFocus={()=>{setIsClick(true)}} onChange={handleChange} ref={dateRef}></DateInput>
            </InputWrap>
        </>
    )
}