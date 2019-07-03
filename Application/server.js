const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var db = require("./models");
const app = express();
const port = process.env.PORT || 5000;
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// Require all models

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/users",
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  );

app.listen(port, () => console.log(`Listening on port ${port}`));
