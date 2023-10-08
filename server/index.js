const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express()

const { UsersModel } = require('./models/UserModels');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { verifyUser } = require('./middlewares/authMiddleware.js');



// import { verifyUser } from "./middlewares/authMiddleware";

// ===================================

// Configure CORS middleware to allow requests from specific origins
const corsOptions = {
    // for multiple urls
    // origin: ['http://localhost:3000'], // Replace with the origin you want to allow
    origin: 'http://localhost:3000', // Replace with the origin you want to allow
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions))
app.use(express.json())

app.use(cookieParser())

// configure env
// dotenv.config({ path: './.env' })
// or , This is valid for only for current path
dotenv.config()

// ===================================

const dbName = 'test';
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
// ===================================

// const PORT = process.env.SERVER_PORT || 3001
const PORT = process.env.SERVER_PORT

// ===================================




// Login Part
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: "1d" })
                        res.cookie('token', token)
                        res.json("Login Success");
                    } else {
                        res.json("Password Incorrect");
                    }
                })

                // without bcrypt

                // if (user.password === password) {
                //     res.json("Login Success")
                // } else {
                //     res.json("Password Incorrect")
                // }
            } else {
                res.json("User Not Found")
            }
        })
        .catch(err => res.json(err))
})

// ===================================


// Register Part

// ===================================
app.post('/register', (req, res) => {
    // const { name, email, password, contactNo, organizationName, city, state } = req.body;
    const { name, email, password } = req.body;
    // console.log(req.body);
    UsersModel.findOne({ email: email })
        // UsersModel.findOne({ $or: [{ email: email }, { contactNo: contactNo }] })
        .then(user => {
            if (user) {
                res.json("Already have an account");
            } else {
                const saltRounds = 1;
                bcrypt.hash(password, saltRounds)
                    .then((hashedPassword) => {

                        // UsersModel.create({ name: name, email: email, password: password, contactNo: contactNo, organizationName: organizationName, city: city, state: state })
                        UsersModel.create({ name, email, password: hashedPassword })
                            .then(result => res.json("Account Created"))
                            .catch(error => res.json(error))
                    })
                    .catch(error => res.json(error.message))
            }
        })
        .catch(error => res.json(error))


})

// Home Page Part

// // ===================================
// const verifyUser = (req, res, next) => {
//     const cookieToken = req.cookies.token;
//     // console.log(cookieToken);
//     if (!cookieToken) {
//         return res.json('Token in Cookie was not available')
//     }
//     // next();
// }

app.get('/home', verifyUser, (req, res) => {
    return res.json('Success');
})



// ===================================

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})