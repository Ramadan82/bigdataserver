const mongoose = require("mongoose");
const schema = mongoose.Schema;

const serviceSchema = new schema(
  {
    category: {
      type: String,
      required: true,
    },
    serviceTypes: {
      type: String,
      required: true,
    },
    serviceTypeDetails: {
      type: String,
    },
    typeOfData: {
      type: String,
    },
    typeOfDataDescription: {
      type: String,
    },
    typeOfDataDescriptionDetails: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
