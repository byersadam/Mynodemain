const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Replace 'mongodb://localhost/mydatabase' with your MongoDB connection string
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose models for your collections
const RandomProperty = mongoose.model('RandomProperty', new mongoose.Schema({
  item_id: String,
  name: String,
  type: String,
  price: Number,
  motif: String,
}));

const UserPreference = mongoose.model('UserPreference', new mongoose.Schema({
  user_id: String,
  preferences: {
    favorite_items: [String],
    equipped_weapon: String,
    motif_preference: String,
  },
}));

// Define the file paths for your JSON files with full paths
const randomPropertiesFilePath = path.join(__dirname, 'randomproperties.json'); // Use __dirname to get the current script's directory
const userPreferencesFilePath = path.join(__dirname, 'userpreferences.json'); // Use __dirname to get the current script's directory

// Read JSON files
const randomPropertiesData = JSON.parse(fs.readFileSync(randomPropertiesFilePath, 'utf8'));
const userPreferencesData = JSON.parse(fs.readFileSync(userPreferencesFilePath, 'utf8'));

// Insert data into MongoDB collections
async function insertData() {
  try {
    await RandomProperty.insertMany(randomPropertiesData);
    await UserPreference.insertMany(userPreferencesData);
    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the data insertion function
insertData();
