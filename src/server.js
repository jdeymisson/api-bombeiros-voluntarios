const express = require("express");

const app = express();

const PORT = 3333;

app.listen(3333, () => console.log(`Server is running on port ${PORT}`));