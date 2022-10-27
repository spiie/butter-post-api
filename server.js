const express = require('express')
const { Db } = require("./class/Db")
const { User } = require("./class/User")

const port = 30

const db = new Db("", "", "")
db.connect()

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send("Bienvenue dans l'api de Butter !")
})

app.use('/api/register', async (req, res) => {
  const data = req.body

  if (req.body.type === "register") {
    const user = new User(data.username, data.email, data.password)
    user.registerUser(db)
    res.status(200)

  } else if (req.body.type == "checkUsername") {
    await db.checkUserThings('username', req.body.username) === true ? res.status(200) : res.status(404)

  } else if (req.body.type === "checkEmail") {
    await db.checkUserThings('email', req.body.email) === true ? res.status(200) : res.status(404)

  }
  res.end()
})

app.use('/api/login', async (req, res) => {
  console.log("Try to login")
  console.log(await db.checkUserLogin(req.body.email, req.body.password))
  await db.checkUserLogin(req.body.email, req.body.password) === true ? res.status(200) : res.status(404)
  res.end()
})

app.listen()