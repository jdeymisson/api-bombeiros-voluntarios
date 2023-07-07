const { Router } = require("express");

const TimeEntries = require("../controllers/TimeEntries");

const timeEntries = new TimeEntries();

const timeEntriesRoutes = new Router();

timeEntriesRoutes.delete("/:id", timeEntries.delete);
timeEntriesRoutes.get("/:id", timeEntries.show);
timeEntriesRoutes.post("/", timeEntries.create);

module.exports = timeEntriesRoutes;