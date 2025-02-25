const newsRoute = require('./news');
const meRoute = require('./me');
const coursesRoute = require('./courses');
const siteRoute = require('./site');

function route(app) {

    app.use('/news', newsRoute);
    app.use('/me', meRoute);
    app.use('/courses', coursesRoute);
    app.use('/', siteRoute);
}
module.exports = route;