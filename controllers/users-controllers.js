
const User = require("../model/user");  
 
const getUsers = async (req, res) => {  

    // let page = req.query.page;
    // let limit = req.query.limit;
    // We destructure the req.query object to get the page and limit variables from url 
    // Status: ALL, DRAFT, CREATED, COMPLETED
    const { page = 1, limit = 10 } = req.query; 

    try {
        const usersFound = await User.find({}) 
        .limit(limit * 1) 
        .skip((page - 1) * limit);
        
        const count = await User.countDocuments({});
        console.log("Users found: " + usersFound); 
        res.render("users", {users: usersFound, total: count});
    }catch (err){
        console.log(err);
        res.render('error', {message: "Could not get users", error: {status: 500, stack: err}})
    }  
    
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