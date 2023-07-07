
exports.up = knex => knex.schema.createTable("time_entries", table => {
    table.increments("id");
    table.text("cpf");
    table.text("name");
    table.float("hours");
    table.text("work");
    table.text("launch_user");
    table.integer("user_id").references("id").inTable("users");
    table.integer("provider_id").references("id").inTable("providers");

    table.datetime("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("time_entries");
