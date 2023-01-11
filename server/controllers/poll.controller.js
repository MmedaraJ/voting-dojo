const { response, request } = require('express');
const { Poll: Poll } = require("../models/poll.model");
const { Option } = require("../models/option.model");

module.exports.index = (request, response) => {
    response.json({
       message: "Hello World"
    });
}

module.exports.createPoll = (request, response) => {
    const {
        question, 
        options,
        votes
    } = request.body;

    Poll.create({
        question, 
        options,
        votes
    })
        .then(poll => {
            response.json({
                msg: "success",
                poll: poll
            });
        })
        .catch(err => response.status(400).json(err));
}

module.exports.getAllPolls = (request, response) => {
    Poll.find({})
        .then(poll => response.json(poll))
        .catch(err => console.log(err));
}

module.exports.getPoll = (request, response) => {
    Poll.findOne({
        _id: request.params.id
    })
        .then(poll => response.json(poll))
        .catch(err => console.log(err));
}

module.exports.getTopPolls = (request, response) => {
    const number = parseInt(request.params.number);
    Poll.find({})
        .sort({votes: -1})
        .limit(number)
        .then(poll => response.json(poll))
        .catch(err => console.log(err));
}

module.exports.getRecentPolls = (request, response) => {
    Poll.find({})
        .sort({createdAt: -1})
        .then(poll => response.json(poll))
        .catch(err => console.log(err));
}

module.exports.getPollsWithSameQuestion = (request, response) => {
    Poll.findOne({
        question: request.params.question
    })
        .then(polls => {
            console.log(`Questions are: ${polls}`);
            response.json(polls);
        })
        .catch(err => console.log(err));
}

module.exports.updateOnePoll = (request, response) => {
    Poll.findOneAndUpdate(
        {
            _id: request.params.id
        },
        request.body,
        {new: true}
    )
    .then(updatedPoll => response.json(updatedPoll))
    .catch(err => response.json(err));
}