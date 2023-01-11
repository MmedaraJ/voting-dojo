const PollController = require('../controllers/poll.controller');

module.exports = function(app){
    app.get('/api', PollController.index);
    app.post('/api/polls/new', PollController.createPoll);
    app.get('/api/polls', PollController.getAllPolls);
    app.get('/api/polls/recent', PollController.getRecentPolls);
    app.get('/api/polls/:id', PollController.getPoll);
    app.put('/api/polls/update/:id', PollController.updateOnePoll);
    app.get('/api/polls/top/:number', PollController.getTopPolls);
}