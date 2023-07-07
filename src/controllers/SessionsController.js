const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

class SessionsController {
    async create(request, response){
        const { email, password } = request.body;

        const user = await knex("users")
            .where({ email })
            .first();

        if(!user) {
            throw new AppError("Email e/ou senha inválidos!", 401);
        };
            
        const passwordDecript = await compare(password, user.password);

        if(!passwordDecript) {
            throw new AppError("Email e/ou senha inválidos!", 401);
        };

        const { secret, expiresIn } = authConfig.jwt;
        
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        response.status(200).json({ user, token });
    };
};

module.exports = SessionsController;