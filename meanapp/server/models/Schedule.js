var mongoose = require('mongoose');

// Create the UserSchema.
var Days = new mongoose.Schema({
  Support: {
    type: String,
    required: true,
    default: "0"
  },
  Dispatcher: {
    type: String,
    required: true,
    default: "0"
  },
  IIF: {
    type: String,
    required: true,
    default: "0"
  },
   Planned: {
      type: String,
      required: true,
      default: "0"
    },
    UnPlanned: {
       type: String,
       required: true,
       default: "0"
     }
});

var ScheduleSchema = new mongoose.Schema({
  Month: {
    type: String,
    required: true
  },
  Engineer: {
    type: String,
    required: true
  },
  MonthlyDays:[Days]
});
// Export the model.
module.exports = mongoose.model('Schedule', ScheduleSchema);
