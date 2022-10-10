import styled from "styled-components"

const ListItemBox = styled.div`
  display:flex;
// 임시 css
// max-width:1300px;
// width:100%;
  width:1300px;

`
const ThumbnailImgBox = styled.div`
  width: 280px;
  flex-shrink: 0;
  border: 1px solid #000;
  img{
    
  }
`
const ContentsBox = styled.div`
  padding: 20px 40px;
  border: 1px solid #000;
  width: calc(100% - 280px);

`
const StatusBox = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:20px;
  .status{
    font-size:13px;
    border: 1px solid #000;
    padding: 7px 15px;
    background: rgba(0, 77, 73, 1);
    color: #fff;
    letter-spacing: -0.4px;
  }
`
const ItemInfoBox = styled.div`
  max-width:650px;
  width:85%;
`
const TextBox = styled.div`
  margin-bottom:20px;
  .title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom:10px;
  }
  .desc{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: rgba(169, 169, 169, 1);
    font-size: 13px;
  }
`
const PeriodBox = styled.div`
  font-size: 14px;
  margin-bottom:20px;
  .recruitment{
    display:inline-block;
    margin-right: 30px;
  }
  .progress{
    display:inline-block;
  }
  .personnel{
    margin-top:10px;
  }
  strong{
    font-weight: bold;
    margin-right: 10px;
  }
  span{

  }
`
const CreatedUser = styled.div`
  display: flex;
  margin-bottom:20px;
  font-size: 14px;

  .userImg{
    
    img{

    }
  }
  .userName{
    margin:0 3px 0 10px;
  }
  .isFamousUser{

    img{
      
    }
  }
`
const LimitBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  letter-spacing: -0.4px;
  color: rgba(144, 148, 156, 1);
  .endDate{
    font-weight: bold;
  }
`

const RateBox = styled.div`
  display: flex;
  align-items: center;
  .lengthBox{
    .length{

    }
    .lengthBg{
      width: 480px;
      height: 2px;
    background: rgba(238, 238, 238, 1);
    }
  }
  .participating{
    margin-left: 30px;
    span{
      font-weight: bold;
    }
  }
`



export default function CampaignItem() {
  /* 테스트 시작 */
    const person  = 80;
    let endEvent = 48;


    const nowRate = (endEvent/ person)*100; 



  /* 테스트 끝 */
  return (
    <ListItemBox>
      <ThumbnailImgBox>
        <img src="" alt="썸네일이미지" />
      </ThumbnailImgBox>
      <ContentsBox>
        <StatusBox>
          <div className="status">
            {/* 상태 확인 state 넣어주세요 */}
            모집 중
          </div>
          <div className="shareAndLikeBox">
            <button>공</button>
            <button>좋</button>
          </div>
        </StatusBox>
        <ItemInfoBox>
          <TextBox>
            <h3 className="title">폐자전거 업사이클링을 통한 자전거 기부</h3>
            <div className="desc">버려진 폐자전거의 부품을 업사이클링하여 디자인 소품을 만듭니다. 수익금은 자전거 기부에 사용 수익금은 자전거 기부에 사용 수익금은 자전거 기부에 사용 수익금은 자전거 기부에 사용 수익금은 자전거 기부에 사용</div>
          </TextBox>
          <PeriodBox>
            <div className="recruitment">
              <strong>모집 기간</strong>
              {/* array 오면 0번 1번 넣어주세요 */}
              <span>2022.09.28 ~ 2022.10.28</span>
            </div>
            <div className="progress">
              <strong>진행 기간</strong>
              {/* array 오면 0번 1번 넣어주세요 */}
              <span>2022.11.01 ~ 2022.11.30</span>
            </div>
            <div className="personnel">
              <strong>모집 인원</strong>
              <span>{80}명</span>
            </div>
          </PeriodBox>
          <CreatedUser>
            <div className="userImg">
              <img src="" alt="." />
            </div>
            <div className="userName">
              김다시
            </div>
            {/* 조건문 넣어주세요 */}
            <div className="isFamousUser">
              <img src="" alt="." />
            </div>
          </CreatedUser>
        </ItemInfoBox>
        <LimitBox>
          <RateBox>
            <div className="lengthBox">
              <div className="length"></div>
              <div className="lengthBg"></div>
            </div>
            <div className="participating">
              <span>{48}명</span> 참여 중
            </div>
          </RateBox>
          <div className="endDate">
            {21}일 남음
          </div>
        </LimitBox>
      </ContentsBox>
    </ListItemBox>
  )
}