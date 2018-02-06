var mongoose = require('mongoose');

// var maxIm = new mongoose.Schema ({
//
// Name:{
//     type: String,
//     require: true,
//     default: "0"
//   },
//
//   Im: {
//       type: String,
//       require: true,
//       default: "0"
//     }
//
//
//
//   });
//
//   var maxSr = new mongoose.Schema ({
//
//     Name:{
//         type: String,
//         require: true,
//         default: "0"
//       },
//
//   Sr: {
//       type: String,
//       require: true,
//       default: "0"
//     }
//
//     });
//
//     var maxFtr = new mongoose.Schema ({
//
//       Name:{
//           type: String,
//           require: true,
//           default: "0"
//         },
//
//       Ftr: {
//           type: String,
//           require: true,
//           default: "0"
//         }
//
//
//         });
//         var maxUpdataSlo = new mongoose.Schema ({
//
//           Name:{
//             type: String,
//             require: true,
//             default: "0"
//           },
//
//           Update: {
//             type: String,
//             require: true,
//             default: "0"
//           },
//
//         });
//
//         var maxQA = new mongoose.Schema ({
//           Name:{
//             type: String,
//             require: true,
//             default: "0"
//           },
//
//       Qa: {
//           type: String,
//           require: true,
//           default: "0"
//         }
//   });
//
//     var maxResolution = new mongoose.Schema ({
//
//       Name:{
//         type: String,
//         require: true,
//         default: "0"
//       },
//
//         Resolution: {
//            type: String,
//            require: true,
//           default: "0"}
//
//   });

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
