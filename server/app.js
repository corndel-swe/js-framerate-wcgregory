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
  const movies = await Movie.findAll(req.query.genre)
  res.render('movie/index', { movies, genres, tabTitle: "Movie Titles" })
})

app.get('/movie/:movieId', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  const reviews = await Movie.findLastFiveReviews(req.params.movieId)
  //console.log(movie)
  res.render('movie/detail', { movie, reviews, tabTitle: "Movie Details"})
})

app.get('/movie/:movieId/reviews', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  const reviews = await Movie.findReviews(req.params.movieId)
  res.render('movie/reviews', { movie, reviews, tabTitle: movie.title + " | Reviews" })
})

app.get('/reviews/:movieId/new', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  res.render('reviews/new', { movie, tabTitle: movie.title + " | Create a review" })
})

app.post('/reviews/:movieId', async (req, res) => {
  const { comment, rating } = req.body
  await Movie.createReview(req.params.movieId, comment, rating)
  res.redirect('/movie/:movieId')
})

export default app
