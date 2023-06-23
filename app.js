const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const databasePath = path.join(__dirname, "cricketMatchDetails.db");

let database = null;

initializeDatabaseAndServer = async () => {
  try {
    database = open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server is Running at http://localhost:3001/");
    });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDatabaseAndServer();

app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
    SELECT *
    FROM player_details;`;

  const playersArray = await database.all(getPlayersQuery);
  console.log(playersArray);
  response.send(playersArray);
});

module.exports = app;
