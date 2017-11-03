const request = require('supertest')
const moxios = require('moxios')

const buildBody = (text) => ({
  message: {
    text: text,
    chat: {
      id: 123,
    },
  },
})

const TOKEN = 'the-token'

describe('loading express', () => {
  var server

  beforeEach(() => {
    process.env.TOKEN = TOKEN
    moxios.install()
    server = require('../src/server')
  })

  afterEach(() => {
    delete process.env.TOKEN
    moxios.uninstall()
    server.close()
  })

  it('get / works', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })

  it('post / sends message correctly', (done) => {
    request(server)
      .post('/')
      .send(buildBody('hi'))
      .end((err, res) => {
        console.log('################ end', err)
      })
      .expect(200, done)

    moxios.stubRequest(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      status: 200,
      response: {nome: 'rafael'}
    })
  })

  it('post /', (done) => {
    request(server)
      .post('/')
      .send(buildBody('hi'))
      .end((err, res) => {
        console.log('################ end', err)
      })
      .expect(200, done)

    moxios.stubRequest(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      status: 200,
      response: {nome: 'rafael'}
    })
  })
})
