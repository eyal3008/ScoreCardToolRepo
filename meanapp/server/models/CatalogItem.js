var mongoose = require('mongoose');

// Create the UserSchema.
var CISchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('catalogitem', CISchema);
