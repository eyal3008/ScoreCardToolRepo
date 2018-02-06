var mongoose = require('mongoose');

// Create the UserSchema.
var SurveysSchema = new mongoose.Schema({

  Ticket: {
    type: String,
    required: true
  },
  TicketClosureDate: {
    type: String,
    required: true
  },
  Engineer: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Issue: {
    type: String,
    required: true
  },
  Service: {
    type: String,
    required: true
  },
  Customer: {
    type: String,
    required: true
  },
  CustomerSuccessManager: {
    type: String,
    required: true
  },
  CustomerType: {
    type: String,
    required: true
  },
  OverallSupportExperience: {
    type: String,
    required: true
  },
  ResolutionQuality: {
    type: String,
    required: true
  },
  EngineerProfessionalism: {
    type: String,
    required: true
  },
  Responsiveness: {
    type: String,
    required: true
  },
  ResolutionTimeliness: {
    type: String,
    required: true
  },
  CustomerComments: {
    type: String,
    required: true
  },
  EngineerAction: {
    type: String,
    required: true
  },
  CorrectAction: {
    type: String,
    required: true
  },
  AlternativeAction: {
    type: String,
    required: true
  },
  Impression: {
    type: String,
    required: true
  },
  RelevantEngineer: {
    type: String,
    required: true
  },
  FeedbackPerformed: {
    type: String,
    required: true
  },
  QANeeded: {
    type: String,
    required: true
  },
  EngineerFeedback: {
    type: String,
    required: true
  },
  ContactCustomer: {
    type: String,
    required: true
  },
  InvolveCSM: {
    type: String,
    required: true
  },
  Cause: {
    type: String,
    required: true
  }

});

// Export the model.
module.exports = mongoose.model('Surveys', SurveysSchema);
