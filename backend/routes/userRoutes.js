const express = require("express");
const { validateToken } = require("../middleware/jwt")
const router = express.Router();

const { authUser, getUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");

router.post("/", authUser);
router.get("/", getUsers);
router.post("/register", createUser);
router.put("/:id", validateToken, updateUser);
router.delete("/:id", validateToken, deleteUser);

module.exports = router;