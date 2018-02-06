var mongoose = require('mongoose');

// Create the UserSchema.
var TicketsTargetSchema = new mongoose.Schema({

Survey:
{
  type: String,
  required: true,
  default:"0"
},
Ftr:{
  type: String,
  required: true,
  default:"0"
},
UpdateSlo:
{
  type: String,
  required: true,
  default:"0"
},
Resolution:
{
  type: String,
  required: true,
  default:"0"
},
Qa:{
  type: String,
  required: true,
  default:"0"
}
// scorecard_average:{
//   type: String,
//   required: true,
//   default:"0"
// }





});

// Export the model.
module.exports = mongoose.model('tickets_target', TicketsTargetSchema);
