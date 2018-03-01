/* Required resources always go first */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const quotesRouter = require('./routes/quotes');

/* create a PORT that checks the process.env or defaults to 3000 */
const PORT = process.env.PORT || 3000;

/* Start up express */
const app = express();

/* configure views */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* set up logging */
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

/* ROUTES */
app.use('/quotes', quotesRouter);

/*
  HOME route
  Future improvements:
  [TODO] dynamically render the authors
*/
app.get('/', (req, res) => {
  res.render('index', {
    message:       'Hello world!',
    documentTitle: 'This is WDI quotes!!',
    subTitle:      'Read some of the coolest quotes around.',
    showMore:      false,
    quoteAuthors:  ['Unknown', 'Yoda', 'CS Lewis', 'Frank Chimero', 'Pablo Picasso', 'Italo Calvino', 'T. S. Eliot', 'Samuel Beckett', 'Hunter S. Thompson'],
  });
});

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});