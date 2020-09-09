const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

async function init() {
  await mongoose.connect(config.get('dbURL'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(config.get('port'), () => {
    console.log(`server is running on port ${config.get('port')}`);
  });
}

init();
