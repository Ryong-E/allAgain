import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loggedInUserId } from './atoms/atoms';
import Router from './Router';

function App() {
  const [currentUserId,setCurrentUserId] = useRecoilState(loggedInUserId)
  useEffect(()=>{
    if(sessionStorage.getItem("jwtToken") == null){
      setCurrentUserId(null)
    }
  },[currentUserId])
  return <Router />;
}

export default App;
