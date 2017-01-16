var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res) {
  var messages = [];
  for (var message in req.app.locals.rooms[req.params.id].messages)
  {
    var name = "Anonymous " + message.sender;
    if(req.app.locals.rooms[req.params.id].reveal.indexOf(message.sender) != -1)
    {
      name = req.app.locals.users[message.sender].full_name;
    }
    var item = {};
    item.sender = name;
    item.text = message.text;
    messages.push({
      sender: name,
      text: message.text
    });
  }
  res.json(messages);
});

router.post('/:id', function(req, res) {
  console.log(req.body);
  req.app.locals.rooms[req.params.id].messages.push(req.body);
  res.send('success');
});

module.exports = router;
