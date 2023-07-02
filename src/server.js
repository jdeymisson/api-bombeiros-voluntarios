require("express-async-errors");
const express = require("express");

const router = require("./routes");
const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());

app.use(router);

app.use((error, resquest, response, next) => {
        if(error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: "error",
                message: error.message
            });
        } 

        console.log(error.message);
        
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
});

const PORT = 3333;

app.listen(3333, () => console.log(`Server is runnin(on port ${PORT)`)) => {
        if(error instanceof AppError) {

        };
};;