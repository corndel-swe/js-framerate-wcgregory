import { strict as assert } from 'assert'
import request from 'supertest'
import * as cheerio from 'cheerio'
import app from '../../exercises/d2e3.js'

describe('GET /d2e3', function () {
  it('should render the form', async function () {
    const response = await request(app)
      .get('/d2e3')
      .expect('Content-Type', /html/)
      .expect(200)

    const $ = cheerio.load(response.text)
    const form = $('form')
    assert(form.length, 'Form should be present')
    assert.strictEqual(
      form.attr('action'),
      '/submit',
      'Form action should be /submit'
    )
    assert.strictEqual(
      form.attr('method'),
      'post',
      'Form method should be post'
    )
  })
})

describe('POST /submit', function () {
  it('should receive form data', async function () {
    const response = await request(app)
      .post('/submit')
      .type('form')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(200)

    assert(
      response.text.includes('Received: John Doe, john@example.com'),
      'Response should contain the submitted data'
    )
  })
})
