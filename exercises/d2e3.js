import express from 'express'

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'exercises/views')

// TODO: configure the app to use urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/d2e3', (req, res) => {
  res.render('d2e3')
})

app.post('/submit', (req, res) => {
  // TODO: get the `name` and `email` from the form
  // so that the below response works
  const { name, email } = req.body
  res.send(`Received: ${name}, ${email}`)
})

export default app
