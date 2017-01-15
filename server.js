var express = require('express');
var app = express();

var https = require('https');

var users = [];

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/reg/:token', function (req, res) {
  console.log('new user with token' + req.params.token);
  users.push(req.params.token);
  res.end('registed');
});

app.get('', function (req, res) {
  var postData = {
    'data': {
      'message': 'Hello',
      'title': 'It is working'
    },
    'registration_ids': users
  };
  var options = {
    hostname: 'fcm.googleapis.com',
    port: 443,
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Authorization': 'key=' + process.env.API_KEY,
      'Content-Type': 'application/json'
    }
  };
  var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.write(JSON.stringify(postData));
  req.end();
  res.end('done');
});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
