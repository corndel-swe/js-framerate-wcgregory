import express from 'express'
import Movie from '../models/Movie.js'

const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')  // use ejs as the view engine

app.use(express.static('public'))
app.use(express.json())

// TODO: add your endpoints here
app.get('/', async (req, res) => {
    const movies = await Movie.findAll()
    res.render('movie_index', { movies })
})

app.get('/movie/:movieId', async (req, res) => {
    const movie = await Movie.findById(req.params.movieId)
    res.render('movie_detail', { movie })
})

export default app
