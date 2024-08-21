const { Pool } = require('pg')

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: 'localhost', // or wherever the db is hosted
  user: 'darialaia',
  database: 'top_users',
  password: 'kalRiVL0',
  port: 5432, // The default port
})

// Through a Connection URI
// Again, this should be read from an environment variable
// module.exports = new Pool({
//   connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
// });
