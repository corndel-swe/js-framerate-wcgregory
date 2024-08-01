import { strict as assert } from 'assert'
import request from 'supertest'
import * as cheerio from 'cheerio'
import app from '../../exercises/d2e2.js'

describe('GET /d2e1', function () {
  it('should render the view with the image', async function () {
    const response = await request(app)
      .get('/d2e2')
      .expect('Content-Type', /html/)
      .expect(200)

    const $ = cheerio.load(response.text)
    const img = $('img')
    const src = img.attr('src')

    const imgResponse = await request(app)
      .get(src)
      .expect('Content-Type', /image\/jpeg/)
      .expect(200)

    assert.strictEqual(src, '/success.jpg', 'Image src should be /success.jpg')
    assert(imgResponse.body.length > 0, 'Image should not be empty')
  })

  it('image should have correct alt text', async function () {
    const response = await request(app).get('/d2e2')

    const $ = cheerio.load(response.text)
    const img = $('img')
    const alt = img.attr('alt').trim().toLocaleLowerCase()

    assert.strictEqual(
      alt,
      'success kid',
      'Image alt text should be "Success Kid"'
    )
  })
})
