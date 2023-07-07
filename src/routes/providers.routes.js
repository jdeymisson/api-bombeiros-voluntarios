const { Router } = require("express");

const ProvidersController = require("../controllers/ProvidersController");
const providersController = new ProvidersController();

const providersRoutes = new Router();

providersRoutes.delete("/:id", providersController.delete);
providersRoutes.get("/:id", providersController.index);
providersRoutes.get("/", providersController.show);
providersRoutes.post("/", providersController.create);
providersRoutes.put("/", providersController.update);

module.exports = providersRoutes;