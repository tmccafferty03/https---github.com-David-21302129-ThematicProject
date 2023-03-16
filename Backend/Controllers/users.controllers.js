const users = require("users.models.js");


const getAll =(req,res) => {
    users.getAllUsers((err, num_rows, results) => {
        if(err) return res.sendStatus(500);

        return res.status(200).send(results);
    })
}

module.exports = {
    getAll:getAll
} 