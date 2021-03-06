var express = require('express');
var router = express.Router();
let Post = require('../../models/post');
let util = require('../../modules/util');
let statusCode = require('../../modules/statusCode');
let resMessage = require('../../modules/responseMessage');
var moment = require("moment");

router.get("/", async (req, res) => {
    const result = await Post.getAllPost();
    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_ALL_POST, result));
})

router.get("/:idx", async (req, res) => {
    const idx = req.params.idx;
    // NULL Value Error handling
    if (!idx) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    // Wrong Index
    if (!(await Post.checkPost(idx))) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
        return;
    }
    // Success
    const {author, title, content, created_at} = await Post.getPost(idx);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_SUCCESS, {idx: idx, author: author, title: title, content: content, created_at: created_at}));
});

router.post("/", async(req, res) => {
    const {author, title, content} = req.body;
    // NULL Value Error handling
    if (!author || !title || !content) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    const now = moment();
    const created_at = await now.format('YYYY-MM-DD');
    const idx = (await Post.getLastIdx()) + 1;
    const newIdx = await Post.createPost(idx, author, title, content, created_at);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.WRITE_SUCCESS, {idx: newIdx}));
});

router.put("/:idx", async(req, res) => {
    const idx = req.params.idx;
    const {author, title, content} = req.body;
    // NULL Value Error handling
    if (!idx || !author || !title || !content) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    // Wrong Index
    if (!(await Post.checkPost(idx))) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
        return;
    }

    result = await Post.updatePost(idx, author, title, content);
    // Update Fail by DB Error
    if (result.affectedRows !== 1) {
        return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.UPDATE_FAIL));
    }

    const {newAuthor, newTitle, newContent, _} = await Post.getPost(idx);

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.UPDATE_SUCCESS, {idx: idx, author: newAuthor, title: newTitle, content: newContent}));
});

router.delete("/:idx", async(req, res) => {
    const idx = req.params.idx;
    // NULL Value Error handling
    if (!idx) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    // Wrong Index
    if (!(await Post.checkPost(idx))) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
        return;
    }

    result = await Post.deletePost(idx);

    // Update Fail by DB Error
    if (result.affectedRows !== 1) {
        return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DELETE_FAIL));
    }
    
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_SUCCESS, {deletedPostIdx: idx}));
});

module.exports = router;
