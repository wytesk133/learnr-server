var express = require('express');
var router = express.Router();
var push = require('./push.js');

var counter = 0;

router.post('/create', function (req, res) {
  req.body.members = ['You', 'Anonymous (1)', 'Anonymous (2)', 'Anonymous (3)'];
  req.app.locals.groups.push = req.body;
  console.log('Created a new group with 3 bots');
  counter++;
  if(counter%2==0)
  {
    setTimeout(function () {
      push({
        message: {
          title: req.body.name,
          text: 'We found a study group for you!'
        }
      }, req.app.locals.tokens);
      console.log('Push through Firebase');
    }, 2000);
  }
  res.send('success');
});

module.exports = router;
