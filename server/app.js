import express from 'express'
import Movie from '../models/Movie.js'

const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')  // use ejs as the view engine

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TODO: add your endpoints here
app.get('/', async (req, res) => {
  const genres = Movie.allowedGenres
  let movies = {}

  if (req.query.ordered) {
    movies = await Movie.findAll(req.query.genre, req.query.ordered)
  } else {
    movies = await Movie.findAll(req.query.genre)
  }

  res.render('movies/index', { movies, genres, title: "Movie Titles" })
})

app.get('/movies/:movieId', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  const reviews = await Movie.findLastFiveReviews(req.params.movieId)
  res.render('movies/detail', { movie, reviews, title: "Movie Details"})
})

app.get('/movies/:movieId/reviews', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  const reviews = await Movie.findReviews(req.params.movieId)
  res.render('movies/reviews', { movie, reviews, title: movie.title + " | Reviews" })
})

app.get('/reviews/:movieId/new', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  res.render('reviews/new', { movie, title: movie.title + " | Create a review" })
})

app.post('/reviews/:movieId', async (req, res) => {
  const { comment, rating } = req.body
  await Movie.createReview(req.params.movieId, comment, rating)
  res.redirect(`/movies/${req.params.movieId}`)
})

app.get('/reviews', async (req, res) => {
  const movies = await Movie.findAll(undefined, true)
  const reviews = await Movie.findAllReviews(req.query.movie)
  res.render('reviews/index', { movies, reviews, title: "Movie Reviews" })
})

export default app
