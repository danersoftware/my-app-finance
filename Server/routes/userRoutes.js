const express = require("express");
const router = express.Router();
const userContrller = require("../controller/userController");

router.get("/", userContrller.getAllUsers);

router.get("/:userId", userContrller.getUser);

router.post("/", userContrller.createUser);

router.patch("/:workoutId", userContrller.updateUser);

router.delete("/:workoutId", userContrller.deleteUser);

module.exports = router;
