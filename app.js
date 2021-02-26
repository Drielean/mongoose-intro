const mongoose = require("mongoose");
const DishModel = require("./models/Dish");
const CompanyModel = require("./models/Company");

async function init() {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/companiesDB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );

    console.log("Sucessfully connected", connection.connections[0].name);

    const result = await CompanyModel.find(
      {
        number_of_employees: { $lt: 1000 },
        founded_year: { $gt: 2005 },
      },
      { _id: 0, name: 1, founded_year: 1, number_of_employees: 1 }
    )
      .sort({ number_of_employees: 1 })
      .limit(10);

    console.log(result);

    // Criar um novo prato
    const newDish = await DishModel.create({
      name: "Parmegiana",
      ingredients: ["Filet", "Tomato sauce", "Cheese", "Breading", "Basil"],
      prepTime: 40,
      cuisine: "Italian",
      glutenFree: false,
      lactoseFree: false,
      vegan: false,
      servings: 2,
      mealType: "Main Course",
    });

    console.log(newDish);

    // Busca todos os documentos da collection

    const allDishes = await DishModel.find();

    console.log(allDishes);

    const updatedDish = await DishModel.updateOne(
      { _id: "603917a7c989d4281c5bb829" },
      { $set: { calories: 700 } }
    );

    console.log(updatedDish);

    const updatedDish2 = await DishModel.updateOne(
      { _id: "603917a7c989d4281c5bb829" },
      { $push: { ingredients: "Oregano" } }
    );

    const updatedAll = await DishModel.updateMany(
      { ingredients: "Chicken" },
      { $set: { "ingredients.$": "Filet" } }
    );

    console.log(updatedAll);

    const deleted = await DishModel.deleteOne({
      _id: "603917a7c989d4281c5bb829",
    });

    console.log(deleted);

    const deletedMany = await DishModel.deleteMany({ name: "Parmegiana" });

    console.log(deletedMany);

    const updated = await DishModel.findOneAndUpdate(
      { name: "Parmegiana" },
      { $set: { prepTime: 80 } },
      { new: true }
    );

    console.log(updated);
  } catch (err) {
    console.error("Failed to connect to DB", err);
  }
}

init();
