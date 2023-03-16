module.exports = function(app){
    
    
    app.route("/user")
        .get() //Get All users
        .patch() //Update User (May be unneeded)
        .post() //add new user


    app.route("/user/:user_id")
        .get(); //Get One User
    

    app.route("/login")
        .post(); //login

    app.route("/logout")
        .post(); //logout



}