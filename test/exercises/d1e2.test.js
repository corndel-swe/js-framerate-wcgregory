// test/d1e2.test.js
import { strict as assert } from 'assert'
import request from 'supertest'
import * as cheerio from 'cheerio'
import app from '../../exercises/d1e2.js'

describe('GET /d1e2', function () {
  it('should render the view with the message', async function () {
    const response = await request(app)
      .get('/d1e2')
      .expect('Content-Type', /html/)
      .expect(200)

    const $ = cheerio.load(response.text)
    const h1Text = $('h1').text().trim()

    assert.ok(
      h1Text.includes('Hello from d1e2!'),
      'h1 should contain the message'
    )
  })
})
