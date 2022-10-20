const fs = require("fs")

class User {
  constructor(uid, username, email, password) {
    this.uid = uid
    this.username = username
    this.email = email
    this.password = password
  }

  static fetchData() {
    const userData = fs.readFileSync("./data/users.json", { encoding: 'utf8' })
    let userDataJson = JSON.parse(userData)
    return userDataJson
  }

  updateUser() {
    let userData = User.fetchData()
    userData[this.uid.toString()] = this.toJson()

    fs.writeFileSync("./data/users.json", JSON.stringify(userData), { encoding: 'utf8' })
  }

  static checkThing(type, reqValue) {
    let isValid
    Object.entries(User.fetchData()).forEach(entire => {
      const [uid, user] = entrie
      if (type === "email") {
        if (user.email === reqValue) return isValid = false
      } else if (type === "username") {
        if (user.username === reqValue) return isValid = false
      }
    })
    return isValid === false ? false : true
  }

  static checkUsernameValidity(reqUsername) {
    return User.checkThing("username", reqUsername)
  }

  static checkEmailValidity(reqEmail) {
    // eslint-disable-next-line
    const validRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    console.log(validRegex.test(email_loc));
    if (validRegex.test(email_loc)) {
      return User.checkThing("emal", reqEmail)
    } else {
      return false
    }
  }

  registerUser() {
    this.updateUser()
  }

  static loginUser(email, password) {
    let isValid
    Object.entries(User.fetchData()).forEach(entrie => {
      const [uid, user] = entrie
      if (user.email === email && user.password === password) return isValid = true
    })
    return isValid === true ? true : false
  }

  changeUsername(newUsername) {
    if (User.checkUsernameValidity("username", newUsername) === true) this.username = newUsername
  }

  changeEmail(newEmail) {
    if (User.checkEmailValidity("email", newEmail) === true) this.email = newEmail
  }

  static getUser(reqUid) {
    return User.fetchData()[reqUid.toString()]
  }

  toJson() {
    return {
      uid: this.uid,
      username: this.username,
      email: this.email,
      password: this.password,
    }
  }

}

module.exports = { User }