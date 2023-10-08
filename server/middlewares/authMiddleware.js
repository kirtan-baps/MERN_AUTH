const jwt = require('jsonwebtoken');


exports.verifyUser = (req, res, next) => {
    try {
        const cookieToken = req.cookies.token;
        console.log(cookieToken);
        if (cookieToken) {
            jwt.verify(cookieToken, process.env.SECRET_KEY, (err, decoded) => {
                // console.log("Decoded", decoded);
                if (err) return res.json('Token in wrong')
                next();
            })
            // return res.json('Success')
        } else {
            return res.json('Token in Cookie was not available')
        }
    } catch (error) {
        console.log(error);
    }
}


// exports { verifyUser };

// export function verifyUser(req, res, next) {
//     const cookieToken = req.cookies.token;
//     console.log(cookieToken);
//     next();
// }