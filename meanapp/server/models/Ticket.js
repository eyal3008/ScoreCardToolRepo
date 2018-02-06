var mongoose = require('mongoose');

// Create the UserSchema.
var TicketSchema = new mongoose.Schema({
  ACTIVITY_DATE: {
    type: String,
    required: true
  },
  ACTIVITY_TYPE: {
    type: String,
    required: true
  },
  ASSIGNEE_NAME: {
    type: String,
    required: true
  },
  BREACHED_FLAG: {
    type: String,
    required: true
  },
  CATALOG_ITEM: {
    type: String,
    default: "0"
  },
  CLOSE_DATE: {
    type: String,
    required: true
  }
  ,
  OPEN_DATE: {
    type: String,
    required: true
  },
  TICKET_NUMBER: {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = mongoose.model('Ticket', TicketSchema);
