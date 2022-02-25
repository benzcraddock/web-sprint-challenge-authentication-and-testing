const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config') // secret hehe 

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username
  }
  const options = {
    expiresIn: '1d',
  }
  
  const result = jwt.sign(payload, JWT_SECRET, options)

  return result
}

module.exports = {
  buildToken
}
