class User {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
  }

  static checkUsernameValidity(db, reqUsername) {
    return db.checkUserThings("username", reqUsername)
  }

  static checkEmailValidity(db, reqEmail) {
    // eslint-disable-next-line
    const validRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (validRegex.test(reqEmail)) {
      return db.checkUserThings("email", reqUsername)
    } else {
      return false
    }
  }

  registerUser(db) {
    db.createUser(this.username, this.email, this.password)
  }

  static loginUser(db, email, password) {
    return db.checkUserLogin(email, password)
  }

  changeUsername(db, newUsername) {
    if (User.checkUsernameValidity(db, "username", newUsername) === true) this.username = newUsername
  }

  changeEmail(db, newEmail) {
    if (User.checkEmailValidity(db, "email", newEmail) === true) this.email = newEmail
  }

  static getUser(db, reqUid) {
    return db.getUser(reqUid)
  }

  toJson() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    }
  }

}

module.exports = { User }