module.exports = {
  "development": {
    "dialect": "mysql"
  },
  "test": {
    "username": "bp",
    "password": "guitarstring",
    "database": "fitness",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

//heroku prodction db mysql://eoneopgl5e8wv9ht:bvzxvu7geu9jtsjv@tviw6wn55xwxejwj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/e8nshs4wxv69t2vv
