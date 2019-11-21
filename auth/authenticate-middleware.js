/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.Authorization;
  console.log(`\nAuthentication Token Provided:\ntoken\n`);
  console.log(`\nHeaders:\n${req.headers}\n`);

  if (token) {
    const secret = process.env.JWT_SECRET || "make sure it's a secret please";
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Permission denied. Invalid credentials." });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Permission denied. No credentials provided." })
  }
};
