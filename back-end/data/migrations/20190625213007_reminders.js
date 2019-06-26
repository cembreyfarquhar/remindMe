exports.up = function(knex) {
  return knex.schema.createTable("reminders", table => {
    table.increments();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    // title is not unique, set multiple reminders for multiple times a day
    table.string("title", 128).notNullable();
    table.text("description");
    table.integer("start_time", 14);
    table.integer("end_time", 14);
    table.integer("duration", 14);
    table.integer("rating", 4);
  });
};

exports.down = function(knex) {
  return knex.schema.raw("DROP TABLE IF EXISTS reminders");
};
