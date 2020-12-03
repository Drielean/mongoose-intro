const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CatSchema = new Schema({
  name: String,
  age: Number,
  color: String,
  breed: String,
  livesNumber: Number,
  gloves: Boolean,
});

const CatModel = model("Cat", CatSchema);

module.exports = CatModel;
