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
    // time is nullable
    table.integer("alarm_time", 14).unsigned();
    table.boolean("completed_for_day").defaultsTo(false);
    table.boolean("snoozed").defaultsTo(false);
    table.integer("snooze_time", 14).unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.raw("DROP TABLE IF EXISTS reminders");
};
