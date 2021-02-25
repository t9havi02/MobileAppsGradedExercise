const db = require('./db');
const port = 4000;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const express = require('express');
const Ajv = require('ajv').default;
const postingsSchema = require('./schemas/postingsSchema.json')
const categorySchema = require('./schemas/categorySchema.json')
const userSchema = require('./schemas/userSchema.json')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');



app.use(cors());
app.use(bodyParser.json());

//Authentication 

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function(username, password, done) {

    db.query('SELECT * FROM users WHERE username = ?', [username]).then(results => {
      const user = results[0];
    
    console.log(user)
    if(user == undefined) {
      // Username not found
      console.log("HTTP Basic username not found");
      return done(null, false, { message: "HTTP Basic username not found" });
    }

    /* Verify password match */
    if(bcrypt.compareSync(password, user.password) == false) {
      // Password does not match
      console.log("HTTP Basic password not matching username");
      return done(null, false, { message: "HTTP Basic password not found" });
    }
    return done(null, user);
  })
}
));

app.get('/httpBasicProtectedResource',
        passport.authenticate('basic', { session: false }),
        (req, res) => {
  res.json({
    yourProtectedResource: "profit"
  });
});

//General posting related calls

app.get('/postings', (req, res) => {
    db.query('SELECT * FROM postings').then(results => {
      console.log(results)
      res.json({ postingData: results })
    });
  })

app.post('/postings', (req, res) => {
    const ajv = new Ajv();
    const validate = ajv.compile(postingsSchema)
    const valid = validate(req.body)
    if(valid == true){
      db.query(
        'INSERT INTO postings (id, title, description, category, location, image, price, dateOfPosting, delivery, sellerName, sellerPhone, sellerEmail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [uuidv4(), req.body.title, req.body.description, req.body.category, req.body.location,
          req.body.image, req.body.price, req.body.dateOfPosting, req.body.delivery,
          req.body.sellerName, req.body.sellerPhone, req.body.sellerEmail]
        )
        res.send("OK")
    } else {
      res.send("Not OK")
    }

})

//Specific post related calls

app.get('/postings/:postingId', (req, res) => {
  var postingId = req.params.postingId;
  console.log(postingId)
  db.query('SELECT * FROM postings WHERE id = ?', [postingId]).then(results => {
    console.log(results)
    res.json( results )
  })
})

app.post('/postings/:postingId', (req, res) => {
  var postingId = req.params.postingId;
  console.log(postingId)
  const ajv = new Ajv();
  const validate = ajv.compile(postingsSchema)
  const valid = validate(req.body)
  if(valid == true){
    db.query('UPDATE postings SET title = ?, description = ?, category = ?, location = ?, image = ?, price = ?, dateOfPosting = ?, delivery = ?, sellerName = ?, sellerPhone = ?, sellerEmail = ? WHERE id = ?',
    [req.body.title, req.body.description, req.body.category, req.body.location,
      req.body.image, req.body.price, req.body.dateOfPosting, req.body.delivery,
      req.body.sellerName, req.body.sellerPhone, req.body.sellerEmail, postingId])
      res.send("OK")
  } else {
    res.send("Not OK")
  }
})

//Category related calls

app.get('/postings/category', (req,res) => {
  db.query('SELECT * FROM categories').then(results=> {
    console.log(results)
    res.json({ categoryData: results})
  });
})

app.post('/postings/category', (req, res) => {
  const ajv = new Ajv();
  const validate = ajv.compile(categorySchema)
  const valid = validate(req.body)
  if(valid == true){
    res.sendStatus(200)
    db.query(
      'INSERT INTO categories (id, categoryName) VALUES (?, ?)',
      [uuidv4(), req.body.categoryName]
  )
  } else {
    res.send("Not OK")
  }
})

app.get('/postings/category/:categoryId', (req, res) => {
  var categoryId = req.params.categoryId;
  db.query('SELECT * FROM postings WHERE category = ?', [categoryId]).then(results => {
    console.log(results)
    res.json({ postingsData: results})
  })
})

//User related calls

app.get('/users', (req, res) => {
  db.query('SELECT id, username, firstname, lastname, dateJoined FROM users').then(results => {
    console.log(results)
    res.json({ userData: results })
  })
})

app.post('/users', (req, res) => {
  const ajv = new Ajv();
  const validate = ajv.compile(userSchema)
  const valid = validate(req.body)
  if(valid == true){
    const hashedPassword = bcrypt.hashSync(req.body.password, 6)
    db.query('INSERT INTO users (id, username, password, firstname, lastname, dateJoined, email, location) VALUES (?,?,?,?,?,?,?,?)',
    [uuidv4(), req.body.username, hashedPassword, req.body.firstname, req.body.lastname,
      req.body.dateJoined, req.body.email, req.body.location])
      res.send("OK")
  } else {
    res.send("Not OK")
  }
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
        )`),
        db.query(`CREATE TABLE IF NOT EXISTS categories(
          id VARCHAR(255) PRIMARY KEY,
          categoryName VARCHAR(255)
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