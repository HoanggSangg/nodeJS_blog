const Course = require('../models/Course')
const { mutipleMongoseToObject } = require('../../until/mongoose');
const moment = require("moment");

class MeController {

    //[GET] /me/stored/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({});

        //Sort table
        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column] : req.query.type,
            });
        }

        Promise.all([
            courseQuery.lean(), // Dùng `.lean()` để lấy plain objects
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deleteCount]) => {
                courses = courses.map(course => ({
                    ...course,
                    createdAt: moment(course.createdAt).format("HH:mm DD/MM/YYYY"),
                    updatedAt: moment(course.updatedAt).format("HH:mm DD/MM/YYYY"),
                }));

                res.render("me/stored-courses", {
                    deleteCount,
                    courses,
                });
            })
            .catch(next);
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Promise.all([
            Course.findWithDeleted({ deleted: true }).lean(),
            Course.count()
        ])
            .then(([courses, storeCount]) => {
                courses = courses.map(course => ({
                    ...course,
                    deletedAt: moment(course.deletedAt).format("HH:mm DD/MM/YYYY"),
                }));
                res.render('me/trash-courses', {
                    storeCount,
                    courses,
                })
            })
            .catch(next);
    }


}
module.exports = new MeController;