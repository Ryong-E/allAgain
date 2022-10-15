import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { InputErrorMsg } from "../common/Form";

const InputWrap = styled.div`
    position:relative;
    width:150px;
    height:48px;
    background-color:#ffffff;
    box-shadow: ${({ theme }) => theme.boxShadowDefault};
    &.on{
        outline: 2px solid ${({ theme }) => theme.colors.dasidaGreen};
    }
    
`
const InputLabel = styled.span`
    position:absolute;
    z-index:3;
    top:0px;
    left:0px;
    transform:translateY(12px) translateX(15px) scale(1);
    transition:all 0.3s;
    color: #666666;
    &.on{
        transform:translateY(0px) translateX(10px) scale(0.7);
        color:${({theme}) => theme.colors.dasidaGreen};
    }

`
const DateInput = styled.input`
    position:relative;
    z-index:1;
    height:100%;
    width:100%;
    padding-top:20px;
    border:none;
    outline:none;
`
interface RecruitDateProp{
    children : React.ReactNode;
    register : any;
    registername : string;
    watch : any;
}

export default function RecruitDate({children,register,registername,watch,setValue,trigger}:any){
    const dateRef = useRef<HTMLInputElement>(null);
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
        setValue(registername,e.target.value)
        trigger(registername)
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
                <InputLabel tabIndex={0} className={(isClick || isWrite) ? 'on' : 'off'} onBlur={()=>{setIsClick(false)}} onFocus={()=>{setIsClick(true)}}>{children}</InputLabel>
                <DateInput {...register(`${registername}`,{required:`${children}을 입력해주세요`})} type="date" onBlur={()=>{setIsClick(false)}} onFocus={()=>{setIsClick(true)}} onChange={handleChange} ref={dateRef}></DateInput>
            </InputWrap>
        </>
    )
}