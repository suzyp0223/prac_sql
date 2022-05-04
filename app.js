const express = require('express');
const app = express();
// const cors = require('cors');
require('dotenv').config();
//port 설정. 없으면 5000번 연결
const port = process.env.PORT || 5000;
// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models');

//Request 로그 남기는 미들웨어
const requestMiddleware = (req, res, next) => {
  console.log(
    'Request URL:',
    req.originalUrl,
    ' - ',
    new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace('T', ' ')
      .replace(/\..*/, '')
  );
  next();
};

// force: 서버 실행 시 마다 테이블을 재생성 할 것인지 아닌지
// force: true는 모델을 수정하면, 이를 db에 반영하기 위한 옵션이다.
// 단, 테이블을 지웠다 다시 생성하는 거라서 기존 데이터가 날아간다.
// 따라서, alter: true 옵션을 통해 기존 데이터를 유지하면서 테이블을 업테이트 할수있다.
// 다만, 필드를 새로 추가할때 필드가 not null이면 제약조건에따라 오류가 나는 등 대처를 해야 한다.
sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`
    🐣 🐣 🐣 🐣 🐣 🐣 🐣
    🐤 안 녕 🐤 디 비 🐤 
    🐥 🐥 🐥 🐥 🐥 🐥 🐥
    `);
  })
  .catch((err) => {
    console.error(err);
  });

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// json 파싱
app.use(express.json());
app.use(requestMiddleware);

// //router 가져오기
// const userRouter = require("./routes/user");
// const postRouter = require("./routes/post");
// const commentRouter = require("./routes/comment");

// uri 파싱
app.use('/', express.urlencoded({ extended: false }), [
//   userRouter,
//   postRouter,
//   commentRouter,
]);

//정적파일 사용
app.use(express.static('./views'));

//프론트 연결 ejs view engine
app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views'); 

//root 페이지 렌더링. URL에서 '/' Path로 요청이 오면 index.ejs연결
app.get('/', (req, res) => {
  res.render('index');
});

// 일부러 에러 발생시키기 TEST용
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
// 에러 처리 미들웨어
app.use((err, req, res, next) => {
// 템플릿 변수 설정
res.locals.message = err.message;
res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 배포용이 아니라면 err설정. 아니면 빈 객체
res.status(err.status || 500);
res.render('error'); // 템플릿 엔진을 렌더링 하여 응답
});
    
app.listen(port, () => {
  console.log(`${port}: 포트로 서버가 열렸어요!`);
});
