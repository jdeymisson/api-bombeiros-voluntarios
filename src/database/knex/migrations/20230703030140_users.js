
exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("cpf");
    table.text("name");
    table.text("email");
    table.text("password");
    table.boolean("admin").defaultTo(false);

    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");
