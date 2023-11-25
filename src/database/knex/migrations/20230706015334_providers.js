
exports.up = knex => knex.schema.createTable("providers", table => {
    table.increments("id");
    table.text("cpf").notNullable();
    table.text("name").notNullable();
    table.text("origin");
    table.float("hours");
    table.boolean("active").defaultTo(true);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("providers");
