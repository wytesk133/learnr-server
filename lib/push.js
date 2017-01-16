var https = require('https');

module.exports = function (data, receivers) {
  var postData = {
    'data': data,
    'registration_ids': receivers
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
  var req = https.request(options, function (res) {
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
};
