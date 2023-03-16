const db = require("../database.js");
const crypto = require("crypto")


const getAllUsers = (done) => {
    const results =[];

    db.each(
        "SELECT * FROM users",
        [],
        (err, row) => {
            if(err) console.log("Something went wrong: " + err);

            results.push({
                user_id: row.user_id,
                user_name: row.user_name,
                email: row.email
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
    }


 const addNewUser = (user, done) => {    //Creates New User
    const salt = crypto.randomBytes(64);     //Adds salt and hashes password
    const hash = getHash(user.password, salt);
    
        const sql = "INSERT INTO users (user_name, email, password, salt) VALUES (?,?,?,?,?)"
        let values = [user.user_name, user.email, hash, salt.toString("hex")];   //Adds values to query
    
        db.run(sql, values, function(err) {  //executes SQL query
            if(err) return done(err)
    
            return done(null,this.lastID); //returns user id - success
        })
    }
  
  const getOne = (id, done) => {
        const sql = "SELECT * FROM users WHERE user_id = ?"

        db.get(sql,[id], (err,row) => {
            if(err) return done(err)
            if(!row) return done(404)


            return done(null, {
                user_id: row.user_id,
                user_name: row.user_name,
                email: row.email
            })
        })
  }  



    module.exports = {
        getAllUsers: getAllUsers,
        addNewUser: addNewUser
    }