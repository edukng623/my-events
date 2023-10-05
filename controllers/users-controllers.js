
const User = require("../model/user");  
 
const getUsers = (req, res) => { 
    res.render("users", {users: []});
}
const getUserById = (req, res) => {
    let user = {};
    user.id = req.params.id;
    user.name = user.name.concat(user.id);

    res.render("user", user);
}
const createUser = (req, res) => {
    let user = req.body;
    // TODO: Ensure extra contraints
    //  1. User validation
    //  2. Others 
    try{
        User.create(user) 
        .then ( createdUser => {
            console.log(createdUser); 
            res.render("user", createdUser); 
        })
        .catch( err => {
            res.render('error', {message: "Could not create user", error: {status: 400, stack: err}})
        })
    }catch( e) {
        res.render('error', {message: "Could not create user", error: {status: 500, stack: e}})
    }
}
module.exports = {
    listUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser
}