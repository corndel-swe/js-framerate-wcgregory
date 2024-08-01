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

  static async findAll(genre, ordered=false) {
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

    query.push('GROUP BY movies.id')

    if (ordered && ordered === "alpha") {
      query.push('ORDER BY movies.title')
    } else if (ordered && ordered === "date-asc") {
      query.push('ORDER BY movies.releaseDate ASC')
    } else {
      query.push('ORDER BY movies.releaseDate DESC')
    }

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

    query.push('ORDER BY reviews.createdAt')

    const results = await db.raw(query.join(' '), values)
    return results
  }

  static async findLastFiveReviews(id, last=5) {
    const query = 'SELECT reviews.*, movies.* FROM reviews ' +
        'JOIN movies ON reviews.movieId = movies.id ' +
        'WHERE reviews.movieId = ? ' +
        'ORDER BY reviews.createdAt ASC'
    const results = await db.raw(query, [id])
    return results.slice(0, last)
  }

  static async createReview(movieId, comment, rating) {
    const query = 'INSERT INTO reviews (movieId, content, rating) ' +
        'VALUES (?, ?, ?) RETURNING *;'
    const results = await db.raw(query, [movieId, comment, rating])
    return results[0]
  }
}

export default Movie
