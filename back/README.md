## 백엔드

---

### 1. 실행 방법<br>

`cd ~/team02/back`  
`npm install`<br>
`npm run start`<br>
<br>

### 2. 사용 기술<br>

<img src="https://img.shields.io/badge/node-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
<br>

- Javascript를 사용했을 때 백엔드 구축의 기본이 되는 Node.js를 사용했습니다.
- 가장 대중적이고 이용자가 많은 Express를 사용하여 구현했습니다.<br><br>

<img src="https://img.shields.io/badge/Mysql-4479A1?style=flat-square&logo=Mysql&logoColor=white"/>
<br>

- 기획한 기능에 대한 데이터들을 모두 연결하여 관리해야 했기에 NoSQL이 아닌 관계형 데이터베이스를 사용했습니다.<br>
- NoSQL에 비해 RDB의 강력한 장점인 JOIN 기능을 활용해 연결된 데이터들을 효과적으로 관리하였습니다.

<br>

### 3. ERD<br>

- DB구조 링크: [ERD](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1#G1_W7HI96DsrTseSDR_KjYSBkSQ4n_3Mkv)
  <br>

### 4. API<br>

- API 문서 링크: [API 문서](https://documenter.getpostman.com/view/22452329/2s83zjtPNY)
  <br><br>

### 5. 폴더 구조

🖥 back  
├─ 📁node_modules  
└─ 📁src  
  ├─ 📁db  
    ├─ 📁model  
  ├─ 📁images  
    ├─ 📁campaignImages  
    ├─ 📁campaignThumbnail  
    ├─ 📁feeds  
    └─ 📁profiles  
  ├─ 📁middlewares  
  ├─ 📁routers  
  ├─ 📁services  
  └─ 📁utils
