const users = require("../Controllers/users.controllers");


module.exports = function(app){

    app.route("/users")
        .get(users.getAll)
}