var mongoose = require('mongoose');

// Create the UserSchema.
var SurveyTargetsSchema = new mongoose.Schema({

  // targetName: {
  //   type: String,
  //   required: true
  // },
  // value: {
  //   type: String,
  //   required: true
  // }
ResponsivenessScore:{
  type: String,
  required: true,
  default: "0"
},
QualityScore:{
  type: String,
  required: true,
  default: "0"
},
TimelinessScore:{
  type: String,
  required: true,
  default: "0"
},
OverallScore:{
  type: String,
  required: true,
  default: "0"
},
ProfessionalismScore:{
  type: String,
  required: true,
  default: "0"
}




});

// Export the model.
module.exports = mongoose.model('survey_targets', SurveyTargetsSchema);
