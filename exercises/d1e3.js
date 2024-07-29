import express from 'express'

const app = express()
app.set('views', 'exercises/views') // <-- Don't change

// TODO: Configure the app to use EJS as the view engine
app.set('view engine', 'ejs')

app.get('/d1e3', (req, res) => {
  const shopping = [
    'Eggs',
    'Flour',
    'Sugar',
    'Lifesize cutout of Christian Bale as Batman',
    'Milk',
    'Bread'
  ]

  // TODO: Render 'd1e3.ejs', passing the value of `shopping
  res.render('d1e3', {shopping})
})

// TODO: Open d1e3.ejs and follow the instructions

export default app
