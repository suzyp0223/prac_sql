const Sequelize = require('sequelize');
const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");
// 지정된 환경변수가 없으면 'development'로 지정
const env = process.env.NODE_ENV || 'development';

// config/config.json 파일에 있는 설정값들을 불러온다.
// config객체의 env변수(development)키 의 객체값들을 불러온다.
// 즉, 데이터베이스 설정을 불러온다고 말할 수 있다.
const config = require('../config/config.json')[env];
const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize;

// 모듈로 꺼낸다.
module.exports = db;


// // 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // 모델 클래스를 넣음.
// db.User = User;
// db.post = Post;
// db.Comment = Comment;

// // 모델과 테이블 종합적인 연결이 설정된다.
// User.init(sequelize);
// Post.init(sequelize);
// Comment.init(sequelize);

// // db객체 안에 있는 모델들 간의 관계가 설정된다.
// User.associate(db);
// Post.associate(db);
// Comment.associate(db);

// // 모듈로 꺼낸다.
// module.exports = { db, sequelize, User, Post, Comment, Sequelize };




// -----------------------------------------------------------
// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};
// console.log(env);

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
