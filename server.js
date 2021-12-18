// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", (req, res) => {

  let input = req.params.date;
  const datey = (datstr) => {
    // console.log(datstr);
    // return datstr;
    var [a,b,c, ...args] = (datstr.split('+')[0]).split(' ');
    [a,b,c] = [a+',',c,b];
    // console.log([a,b,c, ...args].join(' '));
    return [a,b,c, ...args].join(' ');
  } 
  if(input == '' || input == undefined){
    let now = Date.now();
    res.send({unix: now, utc: datey(Date(now)) });
  } else if(parseInt(input) == input){
    inpt = parseInt(input);
    // console.log('milli ',typeof(input));
    let res1 = {unix : inpt, utc: datey(new Date(inpt).toString())};
    // console.log(res1);
    res.send(res1);
  } else if(new Date(input).toString() !== "Invalid Date"){
    console.log('Date');
    res.send({unix : Date.parse(input), utc: datey(new Date(input).toString())});
  }else {
    res.send({error: "Invalid Date"});
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
