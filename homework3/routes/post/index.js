var express = require('express');
var router = express.Router();
let Post = require('../../models/post');
let util = require('../../modules/util');
let statusCode = require('../../modules/statusCode');
let resMessage = require('../../modules/responseMessage');
var moment = require("moment");

console.log(moment());
console.log(typeof(moment().format('YYYY-MM-DD')));

router.get("/:idx", async (req, res) => {
    const idx = req.params.idx;
    // NULL Value Error handling
    if (!idx) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    // Wrong Index
    const post = Post.filter(post => post.idx == idx);
    if (post.length == 0) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
        return;
    }
    // Success
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_SUCCESS, post[0]));
});

router.post("/", async(req, res) => {
    const {author, title, content} = req.body;
    // NULL Value Error handling
    if (!author || !title || !content) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    var now = moment();
    const created_at = await now.format('YYYY-MM-DD');
    var idx = Post[Post.length - 1].idx + 1;
    Post.push({idx, author, title, content, created_at});
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.WRITE_SUCCESS, Post));
});

router.put("/:idx", async(req, res) => {
    const idx = req.params.idx;
    const {author, title, content} = req.body;
    // NULL Value Error handling
    if (!idx) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    // Wrong Index
    const post = Post.filter(post => post.idx == idx);
    if (post.length == 0) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
        return;
    }
    var arrIdx;
    for(var i = 0; i < Post.length; i++) {
        if (Post[i].idx == idx) {
            arrIdx = i;
            if (author !== undefined) {
                Post[i].author = author;
            }
            if (title !== undefined) {
                Post[i].title = title;
            }
            if (content !== undefined) {
                Post[i].content = content;
            }
            break;
        }
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.UPDATE_SUCCESS, Post));
});

router.delete("/:idx", async(req, res) => {
    const idx = req.params.idx;
    // NULL Value Error handling
    if (!idx) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    // Wrong Index
    const post = Post.filter(post => post.idx == idx);
    if (post.length == 0) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
        return;
    }
    var arrIdx;
    for(var i = 0; i < Post.length; i++) {
        if (Post[i].idx == idx) {
            arrIdx = i;
            break;
        }
    }
    console.log(arrIdx);
    Post.splice(arrIdx, 1);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_SUCCESS, Post));
});

module.exports = router;
