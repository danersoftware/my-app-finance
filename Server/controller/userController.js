const userService = require("../services/userService");

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

const getUser = (req, res) => {
  let userId = req.body.userId;
  let result = userService.getUser(userId);
  res.send(result);
};

const createUser = (req, res) => {
  res.send("Create a new user.");
};

const updateUser = (req, res) => {
  res.send("Update an existing user.");
};

const deleteUser = (req, res) => {
  res.send("Delete an existing user.");
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
