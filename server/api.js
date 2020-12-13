const { Progress } = require('@chakra-ui/react');
const express = require('express');
const db = require('./db');
const { sleep } = require('./utils');

const router = express.Router();

router.get('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movie = await db.watchlist.findOne({ movieId });

  await sleep(); // force increase latency, simulates real life experience. Delete this on prod
  if (!movie) {
    res.sendStatus(404);
  } else {
    res.send(movie);
  }
});

router.put('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movieData = req.body;
  delete movieData._id; // Mongo don't let us update this field
  const movie = await db.watchlist.findOneAndUpdate(
    { movieId },
    { $set: movieData },
    { returnOriginal: false, upsert: true },
  );

  await sleep();
  res.send(movie.value);
});

router.get('/watchlist', async (req, res) => {
  const movies = await db.watchlist
    .find({ watchlist: 'listed' })
    .sort(['release_date', -1])
    .limit(100)
    .toArray();

  res.send(movies);
});


router.get('/profile', async (req, res) => {
  const users = await db.users.find({}).toArray();
  
  res.send(users);
  
})

router.put('/profile', async (req, res) => {
  const { usernameId } = req.params;
  const usernames = req.body;
  delete usernames._id;
  const username = await db.users.findOneAndUpdate(
    { usernameId },
    { $set: username },
    { returnOriginal: false, upsert: true },
  );

  await sleep();
  res.send(username.value);
});

module.exports = router;
