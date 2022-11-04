const http = require("http");
const app = require("./app");
const CONFIG = require("./config/db.config");

const server = http.createServer(app);

server.listen(CONFIG.PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
