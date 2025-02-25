
class NewsController {

    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    //[GET] /news/:stug
    show(req, res) {
        res.send('Hay Qua')
    }
}
module.exports = new NewsController;