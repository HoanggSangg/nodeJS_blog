const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes/indexRoute');
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middlewares/sortMiddleware');
const path = require('path');
const app = express();
const port = 3000;
const db = require('./config/db/indexConfig');

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
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const currenType = field === sort.column ? sort.type : 'default';
            const icons = {
                default: 'bi bi-filter-square-fill',
                asc: 'bi bi-sort-up',
                desc: 'bi bi-sort-down',
            };
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            };

            const icon = icons[currenType];
            const type = types[currenType];

            return `<a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                    </a>`;
        }
    }
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