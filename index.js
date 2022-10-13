const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authroutes = require("./src/routes/authroutes");
const serviceroutes = require("./src/routes/serviceroutes");

const app = express();

mongoose.connect(process.env.MONGODB_URI{useNewUrlParser: true,
    useUnifiedTopology: true,}).then(() => {
  app.listen(process.env.port || 5000, () => {
    const port = server.address().port;
    console.log(`server listening on port ${port}`);
  });
});
app.use(express.json());
app.use("/user", authroutes);
app.use("/services", serviceroutes);
//L0vJFBMH6IiZGayv
