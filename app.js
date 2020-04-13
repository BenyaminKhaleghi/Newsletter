// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us19.api.mailchimp.com/3.0/lists/317eac66b9",
    method: "POST",
    headers: {
      "Authorization":"benny1 9863f14594c2c4b3a4eae4cc6ac99836-us19"
    },
    body: jsonData
  };

  request(options, (error, response, body) => {
      if(error){
        res.sendFile(__dirname + "/failure.html");
      } else {
        if(response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
        } else {
          res.sendFile(__dirname + "/failure.html");
        }

      }
  });

});

app.post("/failure", (req, res) => {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000!');
});
//API Key
//9863f14594c2c4b3a4eae4cc6ac99836-us19
//List ID
//317eac66b9
