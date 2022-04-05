import * as http from "http";
import * as url from "url";
import { StringDecoder } from "string_decoder";

import { handlers, router } from "./router/index.js";

const server = http.createServer((req, res) => {
  const { headers, method } = req;
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");

  const decoder = new StringDecoder("utf-8");
  let payload = "";

  req.on("data", (data) => {
    payload += decoder.write(data);
  });

  req.on("end", () => {
    const chosenHandler = typeof (router[trimmedPath] !== undefined)
      ? router[trimmedPath]
      : handlers.notFounded;
    const data = { trimmedPath, query, method, headers, payload };

    chosenHandler(data, (status, payload) => {
      status = typeof status === "number" ? status : 200;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.end(payloadString);

      if (payload) {
        console.log("Returning this response:", status, payload);
      } else {
        console.log("Empty payload sent :(");
      }
    });
  });
});

server.listen(3000, () => {
  console.log("Server was started on port 3000!");
});
