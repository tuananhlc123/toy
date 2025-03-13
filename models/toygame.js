// Declare mongoose
const mongoose = require('mongoose');

// Declare collection (table) schema
// Note: schema === structure === design
const ToySchema = mongoose.Schema(
   {
      name: String,
      brand: String,
      price: Number,
      // Validate data
      quantity: {
         type: Number,
         min: 1,
         max: 500
      },
      image: String
   }
);

// Declare ToyModel
// "toys" is the collection name
const ToyModel = mongoose.model("toys", ToySchema);

// Export model
module.exports = ToyModel;