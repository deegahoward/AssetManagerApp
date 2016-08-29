var pg = require("pg");

var conString = "pg://postgres:postgres@localhost:5432/postgres";

var client = new pg.Client(conString);

client.connect();

client.query("DROP TABLE assets");

client.query("CREATE TABLE IF NOT EXISTS assets(name varchar(64) NOT NULL, type varchar(64) NOT NULL, quantity int NOT NULL)");

//dummy data

var assetList = [
    {
        name: "Minivan",
        type: "Vehicle",
        quantity: 4
    },
    {
        name: "Motorbike",
        type: "Vehicle",
        quantity: 12
    },
    {
        name: "BrotherX34",
        type: "Printer",
        quantity: 3
    },
    {
        name: "iPhone 6S",
        type: "Mobile Phone",
        quantity: 12
    },
    {
        name: "Voip Cordless",
        type: "Desk Phone",
        quantity: 4
    },
    {
        name: "Nokia 3310",
        type: "Mobile Phone",
        quantity: 13
    },
    {
        name: "A4 silk touch paper",
        type: "Stationary",
        quantity: 6
    },
    {
        name: "Bic black biro",
        type: "Stationary",
        quantity: 100
    }

];

assetList.forEach(function(asset){

    console.log(asset.name);
    client.query("INSERT INTO assets(name, type, quantity) values($1, $2, $3)", [asset.name, asset.type, asset.quantity]);

});


var query = client.query("SELECT name, type, quantity FROM assets ORDER BY name");

query.on("row", function (row, result) {

    result.addRow(row);

});

query.on("end", function (result) {

    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();

});
