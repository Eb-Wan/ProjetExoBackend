const express = require("express");
const { validateToken } = require("../middleware/jwt")
const { body } = require('express-validator');
const router = express.Router();

const { authUser, getUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.post("/", authUser);
router.get("/", validateToken, verifyAdmin, getUsers);

router.post("/register",
    body("name").trim().escape(),
    body("email").trim().isEmail().escape(),
    body("password").trim().escape()
, createUser);

router.put("/:id", validateToken, updateUser);
router.delete("/:id", validateToken, deleteUser);

module.exports = router;