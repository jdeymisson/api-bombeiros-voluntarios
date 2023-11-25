require("express-async-errors");
require("dotenv/config");

const express = require("express");
const router = require("./routes");
const AppError = require("./utils/AppError");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use((error, resquest, response, next) => {
        if(error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: "error",
                message: error.message
            });
        }; 

        console.log(error.message);

        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
});

const porta = process.env.PORT;

app.listen(porta, () => console.log(`Server is running on port ${porta}`));