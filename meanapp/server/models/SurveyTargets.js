var mongoose = require('mongoose');

// Create the UserSchema.
var SurveyTargetsSchema = new mongoose.Schema({

Responsiveness:{
  type: String,
  required: true,
  default: "0"
},
Quality:{
  type: String,
  required: true,
  default: "0"
},
Timeliness:{
  type: String,
  required: true,
  default: "0"
},
Overall:{
  type: String,
  required: true,
  default: "0"
},
Professionalism:{
  type: String,
  required: true,
  default: "0"
}




});

// Export the model.
module.exports = mongoose.model('survey_targets', SurveyTargetsSchema);
