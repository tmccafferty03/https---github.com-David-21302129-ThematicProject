const express = require ("express");
const db = require("./database.js");

const app = express();

const port = 3000;

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("App is listening on port" + port);
});

//Creates Database
app.get("/db", (req,res) => {
    db.run()
    res.send("Database Online")
})


//Endpoints
require("./Routes/users.routes")(app);