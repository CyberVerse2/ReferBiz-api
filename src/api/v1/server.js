const PORT = process.env.PORT || 8000;

const http = require("http");
const app = require("./app");
const server = http.createServer(app);

async function runServer() {
  await server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}
runServer();
