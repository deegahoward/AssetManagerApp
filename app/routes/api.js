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

            // Grab data from http request
            var data = {text: req.body.text, complete: false};

            // Get a Postgres client from the connection pool
            pg.connect(conString, function(err, client, done) {
                // Handle connection errors
                if(err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err});
                }

                // SQL Query > Insert Data
                //client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

                // SQL Query > Select Data
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
        });

      /*  .post(function (req, res) {
            var survey = new Survey({
                creator: req.decoded.id,
                Title: req.body.Title,
                Questions: req.body.Questions,
                Answers: req.body.Answers
            });

            survey.save(function (err) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({
                    success: true,
                    message: 'Survey has been created!'
                });
            });
        });*/

//---------------------- Survey by ID functions ---------------------------

/*
    api.route('/surveys/:survey_id')

        .get(function (req, res) {
            Survey.findById(req.params.survey_id, function (err, survey) {
                if (err) {
                    res.send(err);
                }
                res.json(survey);
            });
        })

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