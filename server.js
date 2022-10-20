const express = require('express')
const fs = require('fs')

const { User } = require("./class/User")

const port = 30

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send("Bienvenue dans l'api de Butter !")
})

app.use('/api/register', (req, res) => {
  const data = req.body

  if (req.body.type === "register") {
    const user = new User(Date.now(), data.username, data.email, data.password)
    user.registerUser()
    res.status(200)

  } else if (req.body.type == "checkUsername") {
    User.checkUsernameValidity(req.body.username) === true ? res.status(200) : res.status(404)

  } else if (req.body.type === "checkEmail") {
    User.checkEmailValidity(req.body.email) === true ? res.status(200) : res.status(404)

  }
  res.end()
})

app.use('/api/login', (req, res) => {
  User.loginUser(req.body.email, req.body.password) === true ? res.status(200) : res.status(404)
  res.end()
})

app.listen(port, () => console.log(User.getUser(`Api status : ON (${port})`)))