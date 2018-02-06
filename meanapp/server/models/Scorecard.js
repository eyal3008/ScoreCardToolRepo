var mongoose = require('mongoose');

var kpi = new mongoose.Schema ({

Month: {  type: String,

  default: "0"},

  Im: {  type: String,

    default: "0"},

  Sr: {  type: String,

    default: "0"},

  Ftr: {  type: String,

    default: "0"},

    Update: {  type: String,

      default: "0"},

      Qa: {  type: String,

        default: "0"},

        Resolution: {  type: String,

          default: "0"},

          Survey: {  type: String,

    default: "0"},

    Rank: {  type: String,

default: "0"},

ScComment: {  type: String,

    default: ""}

});

// Create the UserSchema.
var ScoreCardSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  KPIs : [kpi]
});

// Export the model.
module.exports = mongoose.model('scorecard', ScoreCardSchema);
