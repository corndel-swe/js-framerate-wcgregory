import express from 'express'

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'exercises/views')

// TODO: Configure the app to serve static files from 'exercises/public'
app.use(express.static('exercises/public'))

// TODO: Add a get handler for '/d2e2' which renders 'd2e2.ejs'
app.get('/d2e2', async (req, res) => {
    res.render('d2e2')
})

// TODO: Open d2e2.ejs and follow the instructions

export default app
