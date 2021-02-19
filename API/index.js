const db = require('./db');
const port = 4000;
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors);
app.use(bodyParser);

app.get('/posting', (req, res) => {
    db.query('SELECT * FROM postings').then(results => {
      console.log(results)
      res.json({ items: results })
    });
  })

app.post('/postings', (req, res) => {
    db.query(
      'INSERT INTO posting (id, title, description, category, location, image, price, dateOfPosting, delivery, sellerName, sellerPhone, sellerEmail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      [uuidv4(), req.body.title, req.body.description, req.body.category, req.body.location,
        req.body.image, req.body.price, req.body.dateOfPosting, req.body.delivery,
        req.body.sellerName, req.body.sellerPhone, req.body.sellerEmail]
      )
})

  /* DB init */
Promise.all(
    [
        db.query(`CREATE TABLE IF NOT EXISTS postings(
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(60),
            description VARCHAR(480),
            category VARCHAR(48),
            location VARCHAR(100),
            image VARCHAR(240),
            price DOUBLE,
            dateOfPosting VARCHAR(240),
            delivery VARCHAR(24),
            sellerName VARCHAR(120),
            sellerPhone VARCHAR(24),
            sellerEmail VARCHAR(120)
        )`),
        db.query(`CREATE TABLE IF NOT EXISTS users(
            id VARCHAR(255) PRIMARY KEY,
            username VARCHAR(255),
            password VARCHAR(255),
            firstname VARCHAR(255),
            lastname VARCHAR(255),
            dateJoined VARCHAR(255),
            email VARCHAR(255),
            location VARCHAR(255),
            UNIQUE (username)
        )`)
  
        // Add more table create statements if you need more tables
    ]
  ).then(() => {
    console.log('databases initialized');
    app.listen(port, () => {
        console.log(`Server API listening on http://localhost:${port}\n`);
    });
  })
  .catch(error => console.log(error));