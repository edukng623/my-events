const mongoose = require("mongoose");
const userSchema = mongoose.Schema({ 
    name: {
        type: String,
        required: [true, "User name cannot be empty"]
    },
    email: {
        type: String 
    }
});

module.exports = userSchema;