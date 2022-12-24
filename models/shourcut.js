const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortcutSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
  },
});
module.exports = mongoose.model('shortUrl', shortcutSchema);
