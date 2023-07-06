
exports.up = knex => knex.schema.createTable("providers", table => {
    table.increments("id");
    table.text("cpf");
    table.text("name");
    table.text("tel");
    table.text("origin");
    table.float("hours");

    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");
