const mongoose = require("mongoose");

const url =
  "mongodb+srv://mschervesnquy:mschervesnquy@mauricio01.km0nchs.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url);

module.exports = mongoose;
