const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersController {
    async create(request, response){
        const { cpf, name, email, password, admin } = request.body;
        
        if(cpf && name && email && password){
            const checkCpfAndEmail = await knex("users")
                .where({ cpf })
                .orWhere({ email })
                .first();

            if(checkCpfAndEmail){
                if(checkCpfAndEmail.cpf === cpf){
                    throw new AppError("CPF já está em uso!");
                };

                if(checkCpfAndEmail.email === email){
                    throw new AppError("E-mail já está em uso!");
                };
            };

            const hashedPassword = await hash(password, 8);

            await knex("users").insert({
                cpf,
                name,
                email,
                password: hashedPassword,
                admin
            });

            return response.status(201).json({message: "Usuário cadastrado com sucesso!"});
        };
    };

    async update(request, response){
        const { id, cpf, name, email, password, admin } = request.body;

        
        if( cpf || email){
            let query = knex("users");

            if(cpf){
                query.where({ cpf });
            };

            if(email){
                query.orWhere({ email});
            };
    
            let checkCpfAndEmail = await knex("users").first();

            if(checkCpfAndEmail){
                if(checkCpfAndEmail.cpf === cpf && checkCpfAndEmail.id !== id){
                    throw new AppError("CPF já esta em uso!")
                };
    
                if(checkCpfAndEmail.email === email && checkCpfAndEmail.id !== id){
                    throw new AppError("E-mail já esta em uso!")
                };
            };
        };

        const user = await knex("users")
            .where({ id })
            .first();

        user.cpf = cpf ?? user.cpf;
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.password = password ? await hash(password.toString(), 8) : password;
        user.admin = admin ?? false;

        await knex("users")
            .update({
                cpf: user.cpf,
                name: user.name,
                email: user.email,
                password: user.password,
                admin: user.admin
            }).where({ id });

        return response.status(200).json({
            message: "Usuário atualizado com sucesso!"
        });
    };

    async index(request, response){
        const { id } = request.params;

        const user = await knex("users")
            .where({ id })
            .first();

        response.status(200).json(user);
    };

    async show(request, response){
        const users = await knex("users")
            .orderBy("id", "asc");

        response.status(200).json(users);
    };

    async delete(request, response){
        const { id } = request.params;

        await knex("users")
            .delete()
            .where({ id });
        response.status(200).json({ message: "Usuário deletado com sucesso!"});
    };
};

module.exports = UsersController;