const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class ProvidersController {
    async create(request, response){
        const { cpf, name, tel, origin, hours } = request.body;
        
        if(cpf && name && hours){
            const checkCpf = await knex("providers")
                .where({ cpf })
                .first();

            if(checkCpf){
                throw new AppError("CPF já está em uso!");
            };

            await knex("providers").insert({
                cpf,
                name,
                tel: tel ?? null,
                origin: origin ?? null,
                hours
            });

            return response.status(201).json({message: "Prestador cadastrado com sucesso!"});
        };
    };

    async update(request, response){
        const { id, cpf, name, tel, origin, hours } = request.body;
    
        if(cpf){
            let checkCpf = await knex("providers")
                .where({ cpf })
                .first();

            if(checkCpf?.id !== id){
                throw new AppError("CPF já está em uso!");
            };
        };

        const provider = await knex("providers")
            .where({ id })
            .first();

        provider.cpf = cpf ?? provider.cpf;
        provider.name = name ?? provider.name;
        provider.tel = tel ?? provider.tel;
        provider.origin = origin ?? provider.origin;
        provider.hours = hours ?? provider.hours;

        await knex("providers")
            .update({
                cpf: provider.cpf,
                name: provider.name,
                tel: provider.tel,
                origin: provider.origin,
                hours: provider.hours
            }).where({ id });

        return response.status(200).json({
            message: "Prestador atualizado com sucesso!"
        });
    };

    async index(request, response){
        const { id } = request.params;

        const provider = await knex("providers")
            .where({ id })
            .first();

        response.status(200).json(provider);
    };

    async show(request, response){
        const providers = await knex("providers")
            .orderBy("id", "asc");

        response.status(200).json(providers);
    };

    async delete(request, response){
        const { id } = request.params;

        await knex("providers")
            .delete()
            .where({ id });
        response.status(200).json({ message: "Prestador deletado com sucesso!"});
    };
};

module.exports = ProvidersController;