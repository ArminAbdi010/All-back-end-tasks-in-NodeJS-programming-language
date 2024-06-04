const express = require("express");
const joi = require("joi");
const router = express.Router();

let myAllUsers = [{ id: 1, name: "armin" }];

router.get("/api/users", (req, res) => {
  res.status(200).send(myAllUsers);
});

router.get("/api/users/:id", (req, res) => {
  const fidByIdUsers = myAllUsers.find(
    (item) => item.id === parseInt(req.params.id)
  );

  if (!fidByIdUsers) {
    return res.status(410).send("NOT User in DataBase");
  }

  res.status(200).send(fidByIdUsers);
});

router.post("/api/users", (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).max(8).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  const newUser = {
    id: myAllUsers[myAllUsers.length - 1].id + 1,
    name: req.body.name,
  };

  myAllUsers.push(newUser);

  res.status(200).send(newUser);
});

router.put("/api/users/:id", (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).max(8).required(),
    id: joi.number().required(),
  });

  const { error } = schema.validate({ ...req.body, id: req.params.id });

  if (error) {
    return res.status(400).send(error.message);
  }

  const fidUser = myAllUsers.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );

  if (fidUser === -1) {
    return res.status(410).send("NOT User in DataBase");
  }

  myAllUsers[fidUser].name = req.body.name;
  res.status(200).send(myAllUsers[fidUser]);
});

router.delete("/api/users/:id", (req, res) => {
  const fidUser = myAllUsers.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );

  if (fidUser === -1) {
    return res.status(410).send("NOT User in DataBase");
  }

  myAllUsers = [
    ...myAllUsers.splice(0, fidUser),
    ...myAllUsers.splice(fidUser + 1),
  ];
  res.status(200).send("user removed");
});

module.exports = router;
