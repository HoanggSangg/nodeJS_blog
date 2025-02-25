const Course = require('../models/Course')
const { mutipleMongoseToObject } = require('../../until/mongoose');

class SiteController {

    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then(course => res.render('home', {
                course : mutipleMongoseToObject(course)
            }))
            .catch(error => next.error()); 
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController;