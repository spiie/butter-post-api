const mysql = require("mysql")
import { password } from '../data/password'
class Db {
  constructor(url, user, password) {
    this.url = url
    this.user = user
    this.password = password
  }

  connect() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: '_spiie',
      password: password,
      database: 'butter-post'
    });
    connection.connect();
  }
}