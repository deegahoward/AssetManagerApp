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
            pg.connect(conString, function(err, client, done) {
                // Handle connection errors
                if(err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err});
                }

                var query = client.query("SELECT * FROM assets");

                // Stream results back one row at a time
                query.on('row', function(row) {
                    results.push(row);
                });

                // After all data is returned, close connection and return results
                query.on('end', function() {
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
            pg.connect(conString, function(err, client, done) {
                // Handle connection errors
                if(err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err});
                }

                // SQL Query > Insert Data
                var query = client.query("INSERT INTO assets(name, type, quantity) values($1, $2, $3)", [data.name, data.type, data.quantity]);

                // After all data is returned, close connection and return results
                query.on('end', function() {
                    done();
                    return res.json(data);
                });

            });
        });


//---------------------- Asset by ID functions ---------------------------


    api.route('/assets/:asset_id')


        .delete(function (req, res) {

            var id = req.params.asset_id;

            pg.connect(conString, function(err, client, done) {
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

        });



        /*

        .put(function (req, res) {
            Survey.findById(req.params.survey_id, function (err, survey) {
                if (err)
                    res.send(err);

                survey.Title = req.body.Title;
                survey.Questions = req.body.Questions;
                survey.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'Survey updated!'})
                })
            })


        })

        .delete(function (req, res) {
            Survey.remove({
                _id: req.params.survey_id
            }, function (err, survey) {
                if (err)
                    res.send(err);
            });
        });*/


//-------------------------------------------------------------------------

    app.use('/api', api);

};