import db from '../db/index.js'

class Movie {
  static allowedGenres = [
    'Adventure',
    'Action',
    'Animation',
    'Biography',
    'Crime',
    'Drama',
    'Fantasy',
    'History',
    'Horror',
    'Mystery',
    'Romance',
    'War'
  ]

  static async findAll(genre) {
    const query = [
      'select movies.*',
      'from movies',
      'left join reviews on movies.id = reviews.movieId'
    ]

    const values = []

    if (genre) {
      query.push('where lower(movies.genre) like ?')
      values.push('%' + genre + '%')
    }

    query.push('group by movies.id')
    query.push('order by movies.releaseDate desc')

    const results = await db.raw(query.join(' '), values)
    return results
  }

  static async findById(id) {
    const query = 'select * from movies where id = ?'
    const results = await db.raw(query, [id])
    return results[0]
  }

  static async findReviews(id) {
    const query = 'select * from reviews where movieId = ?'
    const results = await db.raw(query, [id])
    return results
  }

  static async findAllReviews(id) {
    const query = [
      'SELECT reviews.*, movies.*, movies.title AS movie_title',
      'FROM reviews',
      'JOIN movies ON reviews.movieId = movies.id'
    ]
    const values = []

    if (id) {
      query.push('WHERE movieId = ?')
      values.push(id)
    }

    const results = await db.raw(query.join(' '), values)
    return results
  }

  static async findLastFiveReviews(id, last=5) {
    const query = 'select reviews.*, movies.* from reviews ' +
        'join movies on reviews.movieId = movies.id where reviews.movieId = ?;'
    const results = await db.raw(query, [id])
    const lastFive = results.sort((movieA, movieB) => 
      movieA.releaseDate - movieB.releaseDate
    )
    return lastFive.reverse().slice(0, last)
  }

  static async createReview(movieId, comment, rating) {
    const query = 'INSERT INTO reviews (movieId, content, rating) ' +
        'VALUES (?, ?, ?) RETURNING *;'
    const results = await db.raw(query, [movieId, comment, rating])
    return results[0]
  }
}

export default Movie
