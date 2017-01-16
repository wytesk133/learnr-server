var app = require('express')();
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.json());

app.locals.tokens = [];
app.locals.groups = [];

/*
app.locals.users = [
  {
    full_name: '',
    email: 'boostedchicken',
    major: '',
    year: '',
    password: 'pockchamp',
    push_token: ''
  }
]; //user{fuLL_name,email,major,year,password,push_token}
app.locals.rooms = []; //room{messages[message{sender,text}],reveal[id]}
*/

app.use('/reg', require('./lib/token_reg.js'));
app.use('/groups', require('./lib/groups.js'));
/*
app.use('/users', require('./lib/users.js'));
app.use('/chat', require('./lib/chat.js'));
*/

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
