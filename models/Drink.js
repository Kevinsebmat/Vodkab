const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
  },
  directions: {
    type: String,
    required: true,
  },
  photo: {
    type: String
  },
  favorites: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'user' 
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Drink = mongoose.model("drink", DrinkSchema);
module.exports = Drink;
