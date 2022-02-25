const db = require('../../data/dbConfig')

async function find() {
  const rows = await db('users')
    .select('id', 'username', 'password')

  return rows
}

async function findById(id) {
  const rows = await db('users')
    .select('id', 'username', 'password')
    .where('id', id)
    .first()

  return rows
}

async function findByUsername(username) {
  const rows = await db('users')
    .select('id', 'username', 'password')
    .where('username', username)
    .first()

  return rows
}

async function add(user) {
  const [id] = await db('users')
    .insert(user)

  return findById(id)
}

module.exports = {
  find,
  findById,
  findByUsername,
  add
}
