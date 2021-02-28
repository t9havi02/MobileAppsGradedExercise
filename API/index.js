const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const express = require('express');
const Ajv = require('ajv').default;
const postingsSchema = require('./schemas/postingsSchema.json')
const categorySchema = require('./schemas/categorySchema.json')
const locationSchema = require('./schemas/locationSchema.json')
const userSchema = require('./schemas/userSchema.json')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('./posts');
const users = require('./users');
const categories = require('./categories.json')
const locations = require('./locations')

app.set('port', (process.env.PORT || 80));

app.use(cors());
app.use(bodyParser.json());

//Authentication 

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function(username, password, done) {

    const user = users.getUserByName(username);
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
  }
));

const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
let jwtSecretKey = null;
if(process.env.JWTKEY === undefined) {
  jwtSecretKey = require('./jwt-key.json').secret;
} else {
  jwtSecretKey = process.env.JWTKEY;
}


let options = {}

/* Configure the passport-jwt module to expect JWT
   in headers from Authorization field as Bearer token */
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

/* This is the secret signing key.
   You should NEVER store it in code  */
options.secretOrKey = jwtSecretKey;

passport.use(new JwtStrategy(options, function(jwt_payload, done) {
  console.log("Processing JWT payload for token content:");
  console.log(jwt_payload);


  /* Here you could do some processing based on the JWT payload.
  For example check if the key is still valid based on expires property.
  */
  const now = Date.now() / 1000;
  if(jwt_payload.exp > now) {
    done(null, jwt_payload.user);
  }
  else {// expired
    done(null, false);
  }
}));

app.get(
  '/loginForJWT',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const body = {
      id: req.user.id,
      username: req.user.username,
      email : req.user.email
    };

    const payload = {
      user : body
    };

    const options = {
      expiresIn: '1d'
    }

    /* Sign the token with payload, key and options.
       Detailed documentation of the signing here:
       https://github.com/auth0/node-jsonwebtoken#readme */
    const token = jwt.sign(payload, jwtSecretKey, options);

    return res.json({ token });
})

//General posting related calls

app.get('/', (req, res) => {
  res.send("Welcome to my graded exercise API. You can find detailed API info at https://t9havi02.stoplight.io/docs/webinterfacesgradedexercise-t9havi02/reference/WebInterfacesGradedExercise.v1.yaml")
  res.send("But feel free to test out end points such as '/postings' or '/location/1/category/Fitness'")
})

app.get('/postings', (req, res) => {
    const p = posts.getAllPosts();
    res.json(p);
    });

app.post('/postings', passport.authenticate('jwt', { session: false }),
 (req, res) => {
    const ajv = new Ajv();
    const validate = ajv.compile(postingsSchema)
    const valid = validate(req.body)
    if(valid == true){
        posts.InsertPost(req.body.title,
          req.body.description,
          req.body.category,
          req.body.location,
          req.body.image,
          req.body.price,
          req.body.dateOfPosting,
          req.body.delivery,
          req.body.sellerName,
          req.body.sellerPhone,
          req.body.sellerEmail)
        res.send("OK")
    } else {
      res.send("Not OK")
    }

})

//Specific post related calls

app.get('/postings/:postingId', (req, res) => {
  var postingId = req.params.postingId;
  console.log(postingId)
  const p = posts.getPost(postingId)
  res.send(p)
  })


app.post('/postings/:postingId', passport.authenticate('jwt', { session: false }),
 (req, res) => {
  var postingId = req.params.postingId;
  console.log(postingId)
  const ajv = new Ajv();
  const validate = ajv.compile(postingsSchema)
  const valid = validate(req.body)
  if(valid == true){
    const p = posts.getPost(postingId)
    const pi = posts.getPostIndex(postingId)
    console.log(p.sellerName)
    console.log(req.user.username)
      if(p.sellerName == req.user.username){
        posts.UpdatePost(
          postingId,
          req.body.title,
          req.body.description,
          req.body.category,
          req.body.location,
          req.body.image,
          req.body.price,
          req.body.dateOfPosting,
          req.body.delivery,
          req.body.sellerName,
          req.body.sellerPhone,
          req.body.sellerEmail,
          pi)
          res.send("OK")
        }
        else {
          res.send("Unauthorized")
        }
  }
  else {
    res.send("Request Body Invalid")
  }
})

//Category related calls

app.get('/category', (req,res) => {
  const c = categories
  res.json(c)
})

app.get('/category/:categoryId', (req, res) => {
  var categoryId = req.params.categoryId;
  const p = posts.getAllCategoryPosts(categoryId);
  res.json(p)
  })



//Location related calls

app.get('/location', (req,res) => {
  const l = locations.getAllLocations()
  res.json(l)
})

app.get('/location/:locationId', (req, res) => {
  var locationId = req.params.locationId;
  const l = locations.getAllLocationPosts(locationId)
  const p = posts.getAllLocationPosts(l[0].locationName);
  res.json(p)
})

//Combined location and category related calls

app.get('/location/:locationId/category/:categoryId', (req, res) => {
  var locationId = req.params.locationId;
  var categoryId = req.params.categoryId;
  const l = locations.getAllLocationPosts(locationId)
    var locationName = l[0].locationName;
    const p = posts.getAllLocationPosts(locationName);
    const final = p.filter(p => p.category == categoryId)
    res.json(final)
    })

//User related calls

app.post('/users', (req, res) => {
  const ajv = new Ajv();
  const validate = ajv.compile(userSchema)
  const valid = validate(req.body)
  if(valid == true){
    const u = users.getUserByName(req.body.username)
    if(u != undefined){
      if(u.username == req.body.username){
        console.log("Username taken")
        res.send("Username taken")
      }
      else{
        console.log("Username allowed")
        res.send("Username allowed")
      }
    }
    else{
      const hashedPassword = bcrypt.hashSync(req.body.password, 6)
      users.addUser(req.body.username, hashedPassword, req.body.firstname, req.body.lastname,
        req.body.dateJoined, req.body.email, req.body.location)
        res.sendStatus(201)
    }
  }
  else{
    res.send("Bad request body. Has missing or additional information")
  }
})

app.get('/users/:userId', (req, res) => {
  var userId = req.params.userId
  const u = users.getUserById(userId)
  console.log(u.username)
  const p = posts.getAllUserPosts(u.username)
  console.log(p)
  res.json(p)
})

  app.listen(app.get('port'), () => {
    console.log(`Server API listening on https://t9havi02gradedexerciseapi.herokuapp.com/:`, app.get('port'));
});