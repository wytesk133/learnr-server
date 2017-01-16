var express = require('express');
var router = express.Router();

router.get('/:token', function (req, res) {
  if(req.app.locals.tokens.indexOf(req.params.token) === -1)
  {
    req.app.locals.tokens.push(req.params.token);
  }
  console.log('Token registered: ' + req.params.token);
  res.send('success');
});

router.post('/', function (req, res) {
  req.app.locals.users[req.body.user].push_token = req.body.token;
  res.send('success');
});

module.exports = router;
