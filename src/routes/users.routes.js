const { Router } = require("express");

const UsersController = require("./../controllers/UsersController");

const usersController = new UsersController();

const usersRoutes = new Router();

usersRoutes.delete("/:id", usersController.delete);
usersRoutes.get("/:id", usersController.index);
usersRoutes.get("/", usersController.show);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", usersController.update);

module.exports = usersRoutes;