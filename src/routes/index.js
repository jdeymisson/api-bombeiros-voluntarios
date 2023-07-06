const { Router } = require("express");

const usersRoutes = require("./users.routes");
const providersRoutes = require("./providers.routes")

const router = new Router();

router.use("/users", usersRoutes);
router.use("/providers", providersRoutes);

module.exports = router;