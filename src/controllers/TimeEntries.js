const knex = require("../database/knex");

class TimeEntries {
    async create(request, response){
        const { cpf, name, hours, work, launch_user, provider_id } = request.body;
        const { id: user_id } = request.user.id;

    
        await knex("time_entries")
            .insert({
                cpf,
                name,
                hours,
                work,
                launch_user,
                user_id,
                provider_id
            });

            response.status(201).json({ message: "Seu lançamento foi efetuado com sucesso!"});
    };

    async show(request, response){
        const { id } = request.params;
    
        const releasesHours = await knex("time_entries")
            .where({ provider_id: id });

            response.status(201).json({releasesHours: releasesHours});
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