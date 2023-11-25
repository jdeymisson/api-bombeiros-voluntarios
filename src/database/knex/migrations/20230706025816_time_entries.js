
exports.up = knex => knex.schema.createTable("time_entries", table => {
    table.increments("id");
    table.text("cpf").notNullable();
    table.text("name").notNullable();
    table.float("hours").notNullable();
    table.text("work").notNullable();
    table.text("launch_user").notNullable();
    table.integer("user_id").references("id").inTable("users");
    table.integer("provider_id").references("id").inTable("providers");
    table.timestamp("entry").notNullable();
    table.timestamp("exit");
    table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("time_entries");
