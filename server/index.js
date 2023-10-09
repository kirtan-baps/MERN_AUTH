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

const nodemailer = require('nodemailer');



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

// // ===================================

app.post('/forget-password', (req, res) => {
    const { email } = req.body;
    UsersModel.findOne({ email })
        .then(user => {
            if (!user) {
                res.send({ status: "Email Not Found" })
            }
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })

            // ------------Node Mailer Code------------------------

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kirtan.darji22@gmail.com',
                    pass: process.env.NODE_MAILER_GOOGLE_ACCOUNT_PASSWORD
                }
            });

            var mailOptions = {
                from: 'kirtan.darji22@gmail.com',
                // to: 'myfriend@yahoo.com',
                to: email,
                subject: 'Reset your Password',
                text: `Please Don't share this with anyone. \nTap to reset Password: http://localhost:3000/reset-password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);

                    return res.json({ status: 'Success' });
                }
            });

            // ------------------------------------

            // return res.json({ status: 'Success' });
        })
        .catch(err => console.log(err))
})

// ======

app.post('/reset-password/:id/:token', (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.json({ status: "Error in token" });
        } else {
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    UsersModel.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
                        .then(result => res.json({ status: "Success" }))
                        .catch(err => console.log(err))
                })
        }
    })

})




// ===================================

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})

