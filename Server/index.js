const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return false;

  let date = new Date();

  const log = `${date.toLocaleTimeString()} ${
    req.method
  } New Request received ${req.url}\n`;

  const Myurl = url.parse(req.url, true);
  console.log(Myurl);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (Myurl.pathname) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end(`hii, ${Myurl.query.username} and ID: ${Myurl.query.id}`);
        break;
      case "/search":
        const search = Myurl.query.search_query;
        res.end(`Here are your Results for ${search}`);
        break;
      case "/signup":
        if (req.method === "GET") res.end("This is a signup Form");
        else if (req.method === "POST") {
          // DB query
          res.end("Success");
        }
        break;
      default:
        res.end("404 Not found");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("Server Started"));