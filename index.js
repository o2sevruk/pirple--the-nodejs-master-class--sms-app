// import * as url from "url";

import * as http from "http";
import { StringDecoder } from "string_decoder";

const server = http.createServer((req, res) => {
  // const { headers, method } = req;
  // const parsedUrl = url.parse(req.url, true);
  // const { pathname, query } = parsedUrl;
  // const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");

  const decoder = new StringDecoder("utf-8");
  let payload = "";

  req.on("data", (data) => {
    payload += decoder.write(data);
  });

  req.on("end", () => {
    res.end("Hello World!\n");

    if (payload.length) {
      console.log("Request received this payload:", payload);
    } else {
      console.log("Empty payload sent :(");
    }
  });
});

server.listen(3000, () => {
  console.log("Server was started on port 3000!");
});
