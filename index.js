const express = require('express');

const app = express();

const auth = process.env.AUTH;
const email = process.env.EMAIL;

app.get('/.dockercfg', (req, res) => {
  res.send(JSON.stringify({ "https://index.docker.io/v1/": { auth, email } }));
});


app.listen(80);
