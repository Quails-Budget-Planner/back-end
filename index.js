require("dotenv").config();
const server = require('./api/example');
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});