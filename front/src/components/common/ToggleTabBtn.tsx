import styled from "styled-components"


const ToggleBtnBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin: 60px 0 20px;
  border-bottom: 1px solid #000;
  button{
    display:flex;
    align-items:center;
    margin: 0 40px;
    border:none;
    background: inherit;
    cursor:pointer;
    color: ${({theme})=> theme.colors.darkBeige};
    border-bottom: 3px solid transparent;
    padding-bottom: 20px;
    letter-spacing: -0.4px;
    font-size: 15px;
    &.active{
      border-bottom: 3px solid ${({theme})=> theme.colors.darkBeige};
    }
    i{
      display:inline-block;
      width:15px;
      height:15px;
      background-position: center center;
      background-size:cover;
      background-repeat: no-repeat;
      margin-right:10px;
    }
`

type PropsType = {
  leftIconImg ?: String ;
  leftText ?: String ;
  rightIconImg ?: String ;
  rightText ?: String ;
  isActive ?:  Boolean;
  setIsActive : React.Dispatch<React.SetStateAction<boolean>> ;
}
/**
 * @leftIconImg  왼쪽 이미지
 * @leftText  왼쪽 텍스트 
 * @rightIconImg  오른쪽 이미지
 * @rightText  오른쪽 텍스트
 * @ isActive 와 setIsActive 는 useState로 ToggleTabBtn의 부모컴포넌트에 써주세요.
 * @isActive  isActive가 False 이면 왼쪽 컴포넌트가 보이게끔 되어있습니다. 
 * @setIsActive  isActive랑 setIsActive 를 props로 내려줘서 쓰세요.
*/
export default function ToggleTabBtn({leftIconImg,leftText,rightIconImg,rightText, isActive, setIsActive} : PropsType) {

  const handleClickIsActive = (e :React.MouseEvent<HTMLButtonElement> )=>{
    const event = e.target as HTMLButtonElement
    const { classList } = event;

    if(!classList.contains('active')){
      setIsActive((prev) => !prev)
    }else{
      return
    }
  }
  return (
    <ToggleBtnBox>
      <button className={!isActive ? "active" : ""} onClick={handleClickIsActive}><i style={{backgroundImage:`url(${leftIconImg})`}}></i>{leftText}</button>
      <button className={isActive ? "active" : ""} onClick={handleClickIsActive}><i style={{backgroundImage:`url(${rightIconImg})`}}></i>{rightText}</button> 
    </ToggleBtnBox>
  )
}
