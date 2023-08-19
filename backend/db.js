const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://abhinav__naman:1ds21%40CG001@cluster0.cywe4jy.mongodb.net/gofoodmmern?retryWrites=true&w=majority';



const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
    const fetched_data = await mongoose.connection.db.collection("foodData2").find().toArray();
    global.food_items = fetched_data;
    // console.log(global.food_items);
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find().toArray();
    global.food_category = foodCategory;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;
