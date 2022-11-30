const http = require('http');

const port = process.env.PORT || 3000;

const API_HOST = 'http://nhl-score-api.herokuapp.com';
const API_PATH = '/api/scores/latest';

const getScores = async (host = API_HOST, path = API_PATH) => {
  const options = {
    host,
    path,
  };
  const callback = (response) => {
    let str;
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on('end', function () {
      console.log(str);
    });
    return str;
  };

  return http.request(options, callback).end();
};

// const scores = getScores();
// console.log(scores);

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET') {
    res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
  } else {
    if (req.url === '/') {
      res.end(`<h1>Hello World</h1>`);
    }
    if (req.url === '/results') {
      res.end(`<h1>Scores</h1> <p>${scores}</p>`);
    }
  }
  res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
