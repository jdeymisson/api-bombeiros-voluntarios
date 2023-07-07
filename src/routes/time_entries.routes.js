const { Router } = require("express");

const TimeEntries = require("../controllers/TimeEntries");

const timeEntries = new TimeEntries();

const timeEntriesRoutes = new Router();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

timeEntriesRoutes.delete("/:id", timeEntries.delete);
timeEntriesRoutes.get("/:id", timeEntries.show);
timeEntriesRoutes.post("/", ensureAuthenticated, timeEntries.create);

module.exports = timeEntriesRoutes;