const knex = require("../database/knex");

class TimeEntries {
    async create(request, response){
        const { cpf, name, hours, entry, exit, work, launch_user, provider_id } = request.body;
        
        await knex("time_entries")
            .insert({
                cpf,
                name,
                hours,
                entry,
                exit,
                work,
                launch_user,
                user_id: request.user.id,
                provider_id
            });

            response.status(201).json({ message: "Seu lançamento foi efetuado com sucesso!"});
    };

    async show(request, response){
        const { id } = request.params;

        const releasesHours = await knex("time_entries")
            .where({ provider_id: id });

            response.status(201).json(releasesHours);
    };

    async index(request, response){
        const { id } = request.query;
        console.log("rapaz")
        const releasesHours = await knex("time_entries")
            .where({ id })
            .first();

            response.status(201).json(releasesHours);
    };

    async delete(request, response){
        const { id } = request.params;

        await knex("time_entries")
            .delete()
            .where({ id });
        response.status(200).json({ message: "Lançamento deletado com sucesso!"});
    };
};

module.exports = TimeEntries;