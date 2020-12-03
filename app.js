const mongoose = require("mongoose");
const CatModel = require("./models/Cat");

async function init() {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/exampleApp",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(
      `Connected to Mongo! Database name: "${connection.connections[0].name}"`
    );

    // const Sukiy = await CatModel.create({
    //   name: "Batata",
    //   age: 15,
    //   color: "Blue",
    //   breed: "MBC",
    //   livesNumber: 7,
    //   gloves: false,
    // });

    // console.log("Created a new cat: ", Sukiy);

    const cats = await CatModel.find();
    console.log("All the cats: ", cats);

    const amora = await CatModel.findOne({ name: "Amora" });
    console.log("A specific cat: ", amora);

    // findOneAndUpdate()
    const olderAmora = await CatModel.updateOne(
      { name: "Amora" },
      { $set: { age: 3 } }
    );
    console.log("An updated cat: ", olderAmora);

    const deleted = await CatModel.deleteOne({
      _id: "5fc92a80a008561850d43560",
    });
    console.log("Deleted cat: ", deleted);
  } catch (err) {
    console.log("Error", err);
  }
}
init();

// mongoose
//   .connect("mongodb://localhost:27017/exampleApp", {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((connection) => {
//     console.log(
//       `Connected to Mongo! Database name: "${connection.connections[0].name}"`
//     );

//     const Sukiy = CatModel.create({
//       name: "Sukiy",
//       age: 3,
//       color: "Black and White",
//       breed: "MBC",
//       livesNumber: 7,
//       gloves: true,
//     })
//       .then((result) => console.log("Created cat: ", result))
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.error("Error connecting to mongo", err));
