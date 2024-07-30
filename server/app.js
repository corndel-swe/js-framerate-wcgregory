import express from 'express'
import Movie from '../models/Movie.js'

const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')  // use ejs as the view engine

app.use(express.static('public'))
app.use(express.json())

// TODO: add your endpoints here
app.get('/', async (req, res) => {
  const genres = Movie.allowedGenres
  const movies = await Movie.findAll(req.query.genre)
  res.render('movie/index', { movies, genres, title: "Movie Titles" })
})

app.get('/movie/:movieId', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  const reviews = await Movie.findLastFiveReviews(req.params.movieId)
  res.render('movie/detail', { movie, reviews, title: "Movie Details | " + movie.title})
})

app.get('/movie/:movieId/reviews', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  const reviews = await Movie.findReviews(req.params.movieId)
  res.render('movie/reviews', { reviews, movie, title: movie.title + " | Reviews" })
})

app.get('/reviews/:movieId/new', (req, res) => {
  res.render('movie/reviews', { title: "Create a Review" })
})

app.post()

export default app
