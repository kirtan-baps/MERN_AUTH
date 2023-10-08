const mongoose = require('mongoose');

// ---------------------------
// UsersModel

// const UsersSchema = new mongoose.Schema({
//     name: { type: String },
//     email: { type: String },
//     password: { type: String },
//     contactNo: { type: String },
//     organizationName: { type: String },
//     city: { type: String },
//     state: { type: String },
// });

const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const collectionName = 'users';
const UsersModel = mongoose.model(collectionName, UsersSchema);





module.exports = { UsersModel };
