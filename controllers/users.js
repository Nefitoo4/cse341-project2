const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users]
  const result = await mongodb
    .getDatabase()
    .db("cse341-project2")
    .collection("crud users")
    .find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("cse341-project2")
    .collection("crud users")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .remove({ _id: userId }, true);
  if (response.deleteCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
