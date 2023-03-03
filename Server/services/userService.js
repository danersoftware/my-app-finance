const getAllUsers = () => {
  const userJson = require("../data/users.json");
  return userJson;
};

const getUser = (userId) => {
  console.log(userId);
  return userId + " was processed.";
};

const createUser = () => {
  return;
};

const updateUser = () => {
  return;
};

const deleteUser = () => {
  return;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
