const express = require('express');
const app = express();
const port = 6000;
const path = require('path');

app.get('/', (req, res) => {
  res.send('my first express js learning and checking on how to use the watch');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});