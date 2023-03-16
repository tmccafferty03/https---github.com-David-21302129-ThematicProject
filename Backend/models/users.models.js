const db = require("../database.js");

const getAllUsers = (done) => {
    const results =[];

    db.each(
        "SELECT * FROM users",
        [],
        (err, row) => {
            if(err) console.log("Something went wrong: " + err);

            results.push({
                user_id: row.user_id,
                email: row.email
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
    }

    module.exports = {
        getAllUsers: getAllUsers
    }