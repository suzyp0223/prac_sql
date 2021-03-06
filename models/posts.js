const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Posts extends Sequelize.Model {
    //다른 모델과의 관계
    static associate(db) { // 인자로 index.js에서 만든 여러 테이블이 저장되어있는 db객체를 받을 것이다.
      Posts.belongsTo(db.Users, {
        foreignKey: 'userId',
        sourceKey: 'userId',
      });
      Posts.hasMany(db.Comments, {
        foreignKey: 'postId',
        sourceKey: 'postId',
      });
    }
  }
  Posts.init(
    { // 첫번째 객체 인수는 테이블 필드에 대한 설정
      postId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imgUrl:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      //좋아요, 찜 기능 추가하기
    },
    { //두번째 객체 인수는 테이블 자체에 대한 설정
      sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
      modelName: 'Posts', /* 노드 프로젝트의 모델 이름을 설정. */
      tableName: 'posts', /* 실제 데이터베이스의 테이블 이름. */
      timestamps: true, /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. (createdAt, updatedAt 활성화) */
      underscored: false, /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */
      paranoid: false, /* true : deletedAt이라는 컬럼이 생기고 지운 로우의 시각이 기록된다. 로우 복원하려면 미리 true로 설정하자.*/
      charset: 'utf8', /* 인코딩 -한국어 설정 */
      collate: 'utf8_general_ci' /* 한국어. 설정 이모티콘까지 입력할 수 있게 하고 싶다면 utf8mb4 와 utf8mb4_general_ci 를 입력한다. */

      // 출처: https://inpa.tistory.com/entry/ORM-📚-시퀄라이즈-모델-정의하기?category=903202 [👨‍💻 Dev Scroll]
    }
  );
  return Posts;
};
