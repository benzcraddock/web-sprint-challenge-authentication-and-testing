// imports
const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')

// sanity check
test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

test('verify we are using the correct environment', ()  => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('test the `users` model', () => {
  test('the table is empty', async () => {
    const users = await db('users')
    expect(users).toHaveLength(0)
  })
});

describe('test auth router API endpoints', () => {
  describe('POST /register', () => {
    let user = { username: 'hello', password: 'pass123' }
    let result
    request(server)
      .post('/api/auth/register')
      .send(user)
      .then(res => {
        result = res
      })
      .catch(err => {
        result = err
      })

    test('responds with 200', async () => {
      expect(result.status).toEqual(200)
    })

    test('responds with correct username', async () => {
      expect(result.body.username).toEqual('hello')
    })
  })

  describe('POST /login', () => {
    let user = { username: 'goodbye', password: '132pass' }
    let result
    request(server)
      .post('/api/auth/login')
      .send(user)
      .then(res => {
        result = res
      })
      .catch(err => {
        result = err
      })

    test('responds with 200', async () => {
      expect(result.status).toEqual(200)
    })

    test('responds with 401', async () => {
      expect(result.status).toEqual(401)
    })

    test('responds with text `invalid credentials`', async () => {
      expect(result.text).toContain('invalid credentials')
    })
  })
})

describe('test the `jokes` router', () => {
  describe('GET /jokes', () => {
    let result
    request(server)
      .post('/api/jokes')
        .then(res => {
          result = res
        })
        .catch(err => {
          result = err
        })

    test('responds with 401', async () => {
      expect(result.status).toEqual(401)
    })

    test('responds with text `access denied: token required!`', async () => {
      expect(result.text).toContain('access denied: token required!')
    })
  })
})
