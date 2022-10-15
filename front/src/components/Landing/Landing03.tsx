import { Container, Container1300 } from "../common/Containers";
import Landing03TextItem from "./Landing03TextItem";
import LandingImgs from "./LandingImgs";


export default function Landing03() {
  return (
    <Container>
      <Container1300>
        {LandingImgs.landing03Text.map((ele, idx)=> (
            <Landing03TextItem imgSrc ={ele} idx={idx} key={idx + ele} />
          ))}
      </Container1300>
    </Container>
  )
}

