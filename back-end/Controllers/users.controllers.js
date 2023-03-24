const users = require("../models/users.models");
const Joi = require("joi");

const getAll =(req,res) => {
    users.getAllUsers((err, num_rows, results) => {
        if(err) return res.sendStatus(500);

        return res.status(200).send(results);
    })
}

const addNew = (req, res) => {
    const schema = Joi.object({
        "user_name": Joi.string().required(),
        "email": Joi.string().required().email({minDomainSegments: 2}),
        "password": Joi.string().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/)) //RegEx may not work (same one as i used for full stack which was tempramental)
    })

    const { error } = schema.validate(req.body); //Validates incoming request
    if(error) return res.status(400).send(error.details[0].message);

    let user = Object.assign({},req.body)

    users.addNewUser(user, (err, id) => {
        if(err) return res.sendStatus(500) //Fail

        return res.status(201).send({user_id: id})
    })
}


module.exports = {
    getAll: getAll,
    addNew: addNew,
} 