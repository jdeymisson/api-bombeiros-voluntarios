const { Router } = require("express");

const UsersController = require("./../controllers/UsersController");

const usersController = new UsersController();

const usersRoutes = new Router();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", usersController.update);

module.exports = usersRoutes;