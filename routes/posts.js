const express = require("express");
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
const {
    allPost,
    eachPost,
    post,
    updatePost,
    deletePostId,
} = require('../controlller/posts')

//포스트 페이지 렌더링
router.get('/posts', (req, res) => {
    res.render('posts');
});

//전체 게시글 목록 조회 
router.get('/allPost', allPost);

//게시글 상세 조회
// router.get('/eachPost/:postId', eachPost);

// //게시글 작성
// router.post('/Post', post);

// //게시글 수정
// router.put('/:postId', updatePost);

// //게시글 삭제
// router.delete('/:postId', deletePostId);

module.exports = router;