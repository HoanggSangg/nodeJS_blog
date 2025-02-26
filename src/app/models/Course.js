const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema({
  _id: { type: Number,},
  name: { type: String, required: true, },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  slug: { type: String, maxLength: 255 },
  videoId: { type: String, required: true, },
  slug: { type: String, slug: 'name', unique: true },
}, {
  _id: false,
  timestamps: true,
});

//Custom query helpers
Course.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    const sortColumn = req.query.column?.trim();

    if (sortColumn) {
      return this.sort({
        [sortColumn]: isValidType ? req.query.type : 'desc',
      });
    }
    return this; 
  }
  return this; 
}

//Add plugin
mongoose.plugin(slug);

Course.plugin(autoIncrement);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);