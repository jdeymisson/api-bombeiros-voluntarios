const { Router } = require("express");
const usersRoutes = new Router();

const UsersController = require("./../controllers/UsersController");
const usersController = new UsersController();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

usersRoutes.delete("/:id", usersController.delete);
usersRoutes.get("/:id", usersController.index);
usersRoutes.get("/", usersController.show);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;