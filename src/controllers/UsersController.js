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

            const formattedCpf = cpf.replace(/[.-]/g, '');

            await knex("users").insert({
                cpf: formattedCpf,
                name,
                email,
                password: hashedPassword,
                admin
            });

            return response.status(201).json({message: "Usuário cadastrado com sucesso!"});
        };
    };

    async update(request, response){
        const { cpf, name, email, password, admin, idUserAction } = request.body;

        const user_id = idUserAction ?? request.user.id;
        
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
                if(checkCpfAndEmail.cpf === cpf && checkCpfAndEmail.id !== user_id){
                    throw new AppError("CPF já esta em uso!")
                };
    
                if(checkCpfAndEmail.email === email && checkCpfAndEmail.id !== user_id){
                    throw new AppError("E-mail já esta em uso!")
                };
            };
        };

        const user = await knex("users")
            .where({ id: user_id })
            .first();

        user.cpf = cpf ?? user.cpf;
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.admin = admin ?? false;

        if(password !== user.password && password !== undefined){
            user.password = await hash(password.toString(), 8);
        };

        await knex("users")
            .update({
                cpf: user.cpf,
                name: user.name,
                email: user.email,
                password: user.password,
                admin: user.admin
            }).where({ id: user_id });

        return response.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user
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