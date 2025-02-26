const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes/indexRoute');
const methodOverride = require('method-override');

const path = require('path');
const app = express();
const port = 3000;
const db = require('./config/db/indexConfig');
const sortMiddleware = require(path.resolve(__dirname, 'app/middlewares/sortMiddleware'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json()); // Xử lý JSON body

// Http logger
app.use(morgan('combined'));

// Templete engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: require('./helps/handlebars')
}));

app.use(sortMiddleware);
app.use(methodOverride('_method'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//Connect to DB
db.connect();
route(app);