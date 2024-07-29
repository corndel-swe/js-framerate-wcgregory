// test/d2e1.test.js
import { strict as assert } from 'assert'
import request from 'supertest'
import * as cheerio from 'cheerio'
import app from '../../exercises/d2e1.js'

describe('GET /d2e1', function () {
  it('should render the view with the marketing partial content', async function () {
    const response = await request(app)
      .get('/d2e1')
      .expect('Content-Type', /html/)
      .expect(200)

    const $ = cheerio.load(response.text)
    const marketingText = $('marquee').text()

    assert.strictEqual(
      marketingText,
      'We have been trying to contact you about your car insurance!',
      'The marketing section should contain the expected text'
    )
  })
})
