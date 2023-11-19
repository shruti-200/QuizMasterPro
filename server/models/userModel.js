const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
    resetTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

// config => db.js
// controller => routes.post/get/del/update (CRUD) => function..
// middleware => token => login/reset/authorization
// model => models for database
// routes => router => route.post/put/del/get => route.(CRUD)("path", function(controller imports))
//.env => process.env.PORT/ process.enve.MONGO_URL
// server.js / indes.js
