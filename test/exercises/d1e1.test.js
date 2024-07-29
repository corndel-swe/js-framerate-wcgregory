// test/d1e1.test.js
import { strict as assert } from 'assert'
import request from 'supertest'
import app from '../../exercises/d1e1.js'

describe('GET /success.jpg', function () {
  it('should return 200 OK and the image', async function () {
    const response = await request(app)
      .get('/success.jpg')
      .expect('Content-Type', /image\/jpeg/)
      .expect(200)

    assert.ok(response.body.length > 0, 'Image should not be empty')
  })
})
