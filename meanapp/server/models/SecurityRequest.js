var mongoose = require('mongoose');

// Create the UserSchema.
var SecurityRequestSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true
  },
  PositionName: {
    type: String,
    required: true
  },
  RequestType: {
    type: String,
    required: true
  },
  Login: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('SecurityRequest', SecurityRequestSchema);
