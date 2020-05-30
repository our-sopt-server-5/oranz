const express = require('express');
const router = express.Router();
const BlogController = require("../controllers/blog");
const auth = require("../middlewares/auth");

router.get("/", auth.checkToken, BlogController.readAll);

router.get("/:idx", auth.checkToken, BlogController.read);

router.post("/", auth.checkToken, BlogController.write);

router.put("/:idx", auth.checkToken, BlogController.update);

router.delete("/:idx", auth.checkToken, BlogController.delete);

module.exports = router;