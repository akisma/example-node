# js-api-redux

Assumes NodeJS has already been installed. If not, install it.

1. `git clone [this repo url]`
2. `npm install` from root
3. import mysql db from root/mysqldb: `mysql -u username -p[root_password] [database_name] < dumpfilename.sql` - make sure the database remains named 'fitness'. also make sure user 'bp' w/pw 'guitarstring' is available locally and has all privs
4. `npm install -g nodemon`
5. `npm install -g gulp`
6. in separate terminal window, cd views/client; run command `gulp`
7. from root dir, `nodemon server.js` - nodemon is a node daemon that will restart upon changes to any server files (client files are ignored)
8. point browser to localhost:8080/

The initial setup was based off of: https://scotch.io/tutorials/easy-node-authentication-setup-and-local

Further expanded to be Sequelize-d by way of: http://stribny.name/blog/2015/09/authentication-quickstart-with-express-passport-and-sequelize

Technologies used, for quick reference:

Server
  - NodeJS
    - express (routing/middleware - http://expressjs.com/)
    - passport (auth - http://passportjs.org/)
    - sequelize (MySQL ORM - http://docs.sequelizejs.com/en/latest/)
    - nodemon (watcher daemon - http://nodemon.io/)
  - MySQL
  - EJS (templates - http://www.embeddedjs.com/)

Client
  - RequireJS (modular management - this will change over to ES2015/Babel/Webpack soon)
  - Backbone
  - Chartist

Tests
  - TBD (of course)

Database Notes 1/4/2016

session -> biomarker_calcs:session_id ->
session -> session_exercise_assoc:session_id -> this is key value pair of exercise types since we don't know what they are
this was designed for one calc per excersise session

client_product_assoc -> what products the client is subscribed to (paying for)

sample_biomarker_result -> actual values stored here
biomarker -> actually just stores the name and description of biomarker (so like 'cortisol' 'stress hormone')

client health condition - 1:1 relationship, just a blob of notes

client fitness status assoc - ??
