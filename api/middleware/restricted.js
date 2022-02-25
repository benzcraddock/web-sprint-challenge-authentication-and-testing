const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config') // secret hehe 

module.exports = (req, res, next) => {
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
  const token = req.headers.authorization

  if(!token) {
    return next({
      status: 401,
      message: 'access denied: token required!'
    })
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err) {
      return next({
        status: 401,
        message: 'access denied: token invalid!'
      })
    }
    req.decodedJwt = decodedToken
    next()
  })
}
