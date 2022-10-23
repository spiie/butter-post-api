const mongoose = require("mongoose")
const Schema = mongoose.Schema
const utils = require("./utils")

const User = mongoose.model('User', new Schema({
  username: String,
  email: String,
  password: String,
  userIcon: String,
}, { timestamps: true }))

class Db {
  constructor(url, user, password) {
    this.url = url
    this.user = user
    this.password = password
  }

  async connect() {
    const dbc = await mongoose.connect("mongodb://localhost:27017/butter-post")
    return dbc
  }

  async createUser(username, email, password) {

    await User.create({
      username: username,
      email: email,
      password: password,
      userIcon: "https://i.imgur.com/WReVJjX.png",
    })
  }

  async getUser(uid) {
    User.findById(utils.decToHex(uid), (err, user) => {
    })
  }

  async deleteUser(uid) {
    await User.deleteOne({ _id: utils.decToHex(uid) });
  }

  async checkUserThings(type, reqValue) {
    let response;
    switch (type) {
      case "email":
        response = await User.findOne({ email: { $regex: new RegExp(reqValue, "i") } }).exec()
        response = response && response != null && response.email.toLocaleLowerCase() === reqValue.toLocaleLowerCase() ? false : true
        break;
      case "username":
        response = await User.findOne({ username: { $regex: new RegExp(reqValue, "i") } }).exec()
        response = response && response != null && response.username.toLocaleLowerCase() === reqValue.toLocaleLowerCase() ? false : true
        break;
    }
    return response
  }

  async checkUserLogin(email, password) {
    const response = await User.findOne({ email: { $regex: new RegExp(email, "i") }, password: password })
    return response && response != null && email.toLocaleLowerCase() === response.email.toLocaleLowerCase() ? true : false
  }

  async updateUser(uid, changes) {
    User.findByIdAndUpdate(uid, { changes })
  }
}

module.exports = { Db }