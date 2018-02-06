var mongoose = require('mongoose');

var averageScoreSchema = new mongoose.Schema ({

  Month: {
     type: String,
     required: true
   },
  avgIm: {
    require: true,
     type: String,
    default: "0"
  },

  avgSr: {
    require: true,
     type: String,
    default: "0"
  },

  avgFtr: {
    type: String,
    require: true,
    default: "0"
  },

    avgUpdate: {
        type: String,
        require: true,
        default: "0"
    },

      avgQa: {
        type: String,
        require: true,
        default: "0"
      },

        avgResolution: {
          require: true,
          type: String,
          default: "0"
        },

        avgSurvey: {
          require: true,
          type: String,
          default: "0"
        },



});

// Create the UserSchema.
// var averageScoreSchema = new mongoose.Schema({
//   Month: {
//     type: String,
//     required: true
//   },
//   AverageScore : [AvgKpi]
// });

// Export the model.
module.exports = mongoose.model('averagescore', averageScoreSchema);
