// import users model
const User = require('../users/users-model')

const checkUser = async (req, res, next) => {
  if(!req.body.username || !req.body.password) {
    next({
      status: 401,
      message: 'Error: username and password are required!'
    })
  } else {
    next()
  }
}

const checkUsernameUnavailable = async (req, res, next) => {
  const username = await User.findByUsername(req.body.username)
  if(!username) {
    next({
      status: 401,
      message: 'Error: invalid credentials! Try again.'
    })
  } else {
    next()
  }
}

const checkUsernameAvailable = async (req, res, next) => {
  const username = await User.findByUsername(req.body.username)
  if(username) {
    next({
      status: 401,
      message: 'Error: that username is taken! Try again.'
    })
  }
}

module.exports = {
  checkUser,
  checkUsernameUnavailable,
  checkUsernameAvailable
}
