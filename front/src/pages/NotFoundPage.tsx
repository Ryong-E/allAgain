import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import upcycle from "../assets/images/icons/icon_upcycle_big.png"
import { LargeButton } from "../components/common/Buttons"
const NavigateButton = styled(LargeButton)`
    width:350px;
    height:60px;
`



export const NotFoundPage = () => {
    const navigator = useNavigate();
  return (
    <div style={{width:"100%",height:"100vh",padding:"80px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <img src={upcycle} style={{opacity:"0.6"}}></img>
        <div style={{display:"flex",flexDirection:"column",position:"absolute"}}>
            <p style={{display:"block",fontSize:"90px",textAlign:"center"}}>404:Not Found</p>
            <p style={{display:"block",fontSize:"80px",textAlign:"center"}}>페이지를 찾을 수 없습니다</p>
            <div style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
                <NavigateButton onClick={()=>{navigator('/')}}>이동하기</NavigateButton>
            </div>
        </div>
    </div>
  )
}