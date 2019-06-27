const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate, generateToken } = require("../auth/authenticate");
const Users = require("./routes-model.js");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // allows a new user to register
  //   expected structure
  //   {
  //     "username": "string",
  //     "password": "string"
  // }
  //   tested via postman at http://localhost:3300/api/register/ -- status 201

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);
      res.status(201).json({ token });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function login(req, res) {
  // allows a user to login
  //   expected structure
  //   {
  //     "username": "string",
  //     "password": "string"
  // }
  //   tested via postman at http://localhost:3300/api/login/ -- status 200
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Success! Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Incorrect username or password" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
