const { Router } = require("express");

const usersRoutes = require("./users.routes");

const router = new Router();

router.use("/users", usersRoutes);

module.exports = router;