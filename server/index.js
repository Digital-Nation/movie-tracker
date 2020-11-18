const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../build'))); // this will load the final bundle of UI, get it with `npm run build`

app.use(express.json()); // let us use request body as json

app.use('/api', api);

// Our backend is simple: if it's an static file we serve it, if it starts with /api we call api router, else, this means this route doesn't exist or it's an UI route. In that case, we redirect to index.html so the user will end up with loading the UI
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
