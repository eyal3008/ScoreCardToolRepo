var mongoose = require('mongoose');

// Create the Schemas.
var onesurvey = new mongoose.Schema ({
  ResponsivenessB: {
    type: Number,
    required: true,
    default: "0"
  },
  ResponsivenessG: {
    type: Number,
    required: true,
      default: "0"
  },
  OverallG: {
    type: Number,
    required: true,
      default: "0"
  },
  OverallB: {
    type: Number,
    required: true,
      default: "0"
  },
  ProfB: {
    type: Number,
    required: true,
      default: "0"
  },
  ProfG: {
    type: Number,
    required: true,
      default: "0"
  },
  QualityG: {
    type: Number,
    required: true,
      default: "0"
  },
  QualityB: {
    type: Number,
    required: true,
      default: "0"
  },
  TimelinessG: {
    type: Number,
    required: true,
      default: "0"
  },
  TimelinessB: {
    type: Number,
    required: true,
      default: "0"
  }
});

var OneSurveySchema = new mongoose.Schema({

    Engineer: {
      type: String,
      required: true
    },
    Month: {  type: String,

      default: "0"},
      
    mysurveys : [onesurvey]

});

// Export the model.
module.exports = mongoose.model('onesurvey', OneSurveySchema);
