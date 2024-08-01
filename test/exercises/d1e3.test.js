import { strict as assert } from 'assert'
import request from 'supertest'
import * as cheerio from 'cheerio'
import app from '../../exercises/d1e3.js'

describe('GET /d1e3', function () {
  it('should render the view with the shopping list', async function () {
    const response = await request(app)
      .get('/d1e3')
      .expect('Content-Type', /html/)
      .expect(200)

    const $ = cheerio.load(response.text)
    const items = $('ul li')
      .map((_, el) => $(el).text().trim())
      .get()

    const expectedItems = [
      'Eggs',
      'Flour',
      'Sugar',
      'Lifesize cutout of Christian Bale as Batman',
      'Milk',
      'Bread'
    ]

    assert.deepStrictEqual(
      items,
      expectedItems,
      'The shopping list should match the expected items'
    )
  })
})
