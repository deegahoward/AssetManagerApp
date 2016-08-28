var Survey = require('../models/survey');
var config = require('../../config');
var secretKey = config.secretKey;



module.exports = function (app, express, io) {

    var api = express.Router();


//---------------------- Survey functions ---------------------------


    api.route('/surveys')

        .get(function (req, res) {
            Survey.find({creator: req.decoded.id}, function (err, surveys) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json(surveys);
            });
        })

        .post(function (req, res) {
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
        });

//---------------------- Survey by ID functions ---------------------------


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
        });


//-------------------------------------------------------------------------

    app.use('/api', api);

};