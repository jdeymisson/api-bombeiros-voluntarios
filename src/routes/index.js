const { Router } = require("express");

const usersRoutes = require("./users.routes");
const providersRoutes = require("./providers.routes")
const timeEntriesRoutes = require("./time_entries.routes")

const router = new Router();

router.use("/users", usersRoutes);
router.use("/providers", providersRoutes);
router.use("/time-entries", timeEntriesRoutes);

module.exports = router;