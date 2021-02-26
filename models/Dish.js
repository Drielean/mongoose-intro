const mongoose = require("mongoose");

const DishSchema = mongoose.Schema({
  name: String,
  ingredients: [String],
  prepTime: Number,
  calories: Number,
  cuisine: String,
  glutenFree: Boolean,
  lactoseFree: Boolean,
  vegan: Boolean,
  servings: Number,
});

const DishModel = mongoose.model("Dish", DishSchema);

module.exports = DishModel;
