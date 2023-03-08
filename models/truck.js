const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const truckSchema = new Schema({
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  name: {
    type: String,
  },
});

const Truck = mongoose.model("Truck", truckSchema);

module.exports = Truck;
