const mongoose = require("mongoose");

const url =
  "mongodb+srv://mschervesnquy:<password>@mauricio01.4citmns.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url);

module.exports = mongoose;
