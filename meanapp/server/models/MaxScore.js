var mongoose = require('mongoose');



// Create the UserSchema.
var MaxSchema = new mongoose.Schema({

  Month: {
    type: String,
    required: true
  },
  maxQA:{

      Name:{
        type: String,
        require: true,
        default: "0"
      },

      score: {
      type: String,
      require: true,
      default: "0"
    }

  },

  maxResolution:{
      Name:{
        type: String,
        require: true,
        default: "0"
      },

      score: {
        type: String,
        require: true,
        default: "0"
      }
  },
  maxUpdateSlo:{

      Name:{
        type: String,
        require: true,
        default: "0"
      },

      score: {
        type: String,
        require: true,
        default: "0"
      }

},

  maxFtr:{

      Name:{
        type: String,
        require: true,
        default: "0"
      },

      score: {
        type: String,
        require: true,
        default: "0"
      }

    },
    maxSr:{

      Name:{
        type: String,
        require: true,
        default: "0"
      },

      score: {
        type: String,
        require: true,
        default: "0"
      }

    },
    maxIm:{

      Name:{
        type: String,
        require: true,
        default: "0"
      },

      score: {
        type: String,
        require: true,
        default: "0"

      }
  }

  });

// Export the model.
module.exports = mongoose.model('maxscore', MaxSchema);
