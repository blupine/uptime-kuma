exports.up = function (knex) {
    return knex.schema.alterTable("monitor", function (table) {
        table.text("json_javascript").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("monitor", function (table) {
        table.dropColumn("json_javascript");
    });
};
