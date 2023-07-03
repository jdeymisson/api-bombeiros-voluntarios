const AppError = require("../utils/AppError");
const knex = require("../database/knex")

class UsersController {
    async create(request, response) {
        const { cpf, name, email, password, admin } = request.body;
        
        if(cpf && name && email && password){
            const user = await knex("users")
                .where({ cpf })
                .orWhere({ email })
                .first();

            if(user){
                if(user.cpf === cpf){
                    throw new AppError("CPF já está em uso!");
                };

                if(user.email === email){
                    throw new AppError("E-mail já está em uso!");
                };
            };

            await knex("users").insert({
                cpf,
                name,
                email,
                password,
                admin
            });

            return response.status(201).json({message: "Usuário cadastrado com sucesso!"});
        };
    };
};

module.exports = UsersController;