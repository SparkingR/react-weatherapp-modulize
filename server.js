const express = require('express');
const path = require('path');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(express.static(path.resolve(__dirname, 'public', 'build')));

app.use('/api', (req, res) => {
  const url = `http://opendata.cwb.gov.tw/api/v1/rest/datastore${req.url}`;
  console.log(`[proxy request] ${url}`);
  req.pipe(request(url))
    .pipe(res);
});

app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'))
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${PORT}`);
});