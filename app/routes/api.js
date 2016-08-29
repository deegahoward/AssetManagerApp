var config = require('../../config');
var secretKey = config.secretKey;
var pg = require('pg');

var conString = "pg://postgres:postgres@localhost:5432/postgres";


module.exports = function (app, express) {

    var api = express.Router();


//---------------------- Survey functions ---------------------------


    api.route('/assets')

        .get(function (req, res) {
            var results = [];

            // Get a Postgres client from the connection pool
            pg.connect(conString, function (err, client, done) {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({success: false, data: err});
                }

                var query = client.query("SELECT * FROM assets");

                // Stream results back one row at a time
                query.on('row', function (row) {
                    results.push(row);
                });

                // After all data is returned, close connection and return results
                query.on('end', function () {
                    done();
                    return res.json(results);
                });


            });
        })

        .post(function (req, res) {

            console.log(req.body);

            // Grab data from http request
            var data = {
                name: req.body.name,
                type: req.body.type,
                quantity: req.body.quantity
            };

            // Get a Postgres client from the connection pool
            pg.connect(conString, function (err, client, done) {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({success: false, data: err});
                }

                // SQL Query > Insert Data
                var query = client.query("INSERT INTO assets(name, type, quantity) values($1, $2, $3)", [data.name, data.type, data.quantity]);

                // After all data is returned, close connection and return results
                query.on('end', function () {
                    done();
                    return res.json(data);
                });

            });
        });


//---------------------- Asset by ID functions ---------------------------


    api.route('/assets/:asset_id')


        .delete(function (req, res) {

            var id = req.params.asset_id;

            pg.connect(conString, function (err, client, done) {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({success: false, data: err});
                }

                var query = client.query("Delete from assets Where id =" + id);


                query.on('end', function (data) {
                    done();
                    return res.json(data);
                });

            })

        })


        .put(function (req, res) {


            var id = req.params.asset_id;

            var data = {

                name: req.body.name,
                type: req.body.type,
                quantity: req.body.quantity
            };

            pg.connect(conString, function(err, client, done) {

                if(err) {
                    done();
                    console.log(err);
                    return res.status(500).send(json({ success: false, data: err}));
                }

                client.query("UPDATE assets SET name=($1), type=($2), quantity=($3) WHERE id=($4)", [data.name, data.type, data.quantity, id]);


                query.on('end', function(data) {
                    done();
                    return res.json(data);
                });
            });

        });


//-------------------------------------------------------------------------

    app.use('/api', api);

};