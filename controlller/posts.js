const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

//전체 게시글 목록 조회
const allPost = async (req, res) => {
  try {
    const postLists = await sequelize.query(
        // users, posts 테이블 조인
        `SELECT P.postId, P.title, P.content, P.imgUrl, P.postNum from Posts P
         JOIN Users U ON U.userId = P.userId
         ORDER BY postId DESC`,
        {
          type: QueryTypes.SELECT,
        }
    );
    if (postLists.length === 0) {
      return res.status(200).json({
        ok: true,
        message: '게시글이 없습니다. 게시글을 작성해주세요.',
      });
    }
    res.status(200).json({
        ok: true,
        message: '전체 게시글 목록 조회 성공!',
    });
  } catch (err) {
    console.err(err);
    res.status(400).json({
      ok: false,
      errorMessage: '전체 게시글 목록 조회 실패',
    });
  }
};






module.exports = {
  allPost,
};
