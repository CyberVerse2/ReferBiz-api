import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 8000;

import { createServer } from 'http';
import app from './app.js';
const server = createServer(app);

async function runServer() {
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}
runServer();
