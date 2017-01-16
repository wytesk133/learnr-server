var express = require('express');
var router = express.Router();

router.post('/signup', function(req, res) {
  console.log(req.body);
  req.app.locals.users.push(req.body);
  res.send('success');
});

router.post('/login', function(req, res) {
  console.log(req.body);
  for (user in req.app.locals.users)
  {
    if(user.username == req.body.username && user.password == req.body.password)
    {
      res.send('success');
      return;
    }
  }
  res.send('failed');
});

router.post('/update')

module.exports = router;
