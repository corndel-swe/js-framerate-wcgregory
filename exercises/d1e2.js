// exercises/d1e2.js
import express from 'express'
import path from 'path'

const app = express()
app.set('views', 'exercises/views') // <-- Don't change

// TODO: Configure the app to use EJS as the view engine
app.set('view engine', 'ejs')

app.get('/d1e2', (req, res) => {
  const msg = 'Hello from d1e2!'
  // TODO: Render 'd1e2.ejs' and pass the msg
  res.render('d1e2', {msg})
})

// TODO: Open d1e2.ejs and follow the instructions

export default app
