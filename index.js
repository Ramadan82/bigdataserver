const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const authroutes = require("./src/routes/authroutes");
const serviceroutes = require("./src/routes/serviceroutes");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 6000;
const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  });
app.use(express.json());
app.use("/user", authroutes);
app.use("/services", serviceroutes);
//L0vJFBMH6IiZGayv
