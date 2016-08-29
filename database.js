var pg = require("pg");

var conString = "pg://postgres:postgres@localhost:5432/postgres";

var client = new pg.Client(conString);
client.connect();


client.query("CREATE TABLE IF NOT EXISTS assets(name varchar(64) NOT NULL, type varchar(64) NOT NULL, quantity int NOT NULL)");
client.query("INSERT INTO assets(name, type, quantity) values($1, $2, $3)", ['Car', 'Vehicle', '4']);
//client.query("ALTER TABLE assets ADD column_name datatype");

var query = client.query("SELECT name, type, quantity FROM assets ORDER BY name");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});
