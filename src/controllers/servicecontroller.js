const mongoose = require("mongoose");
const Service = require("../models/serviceModel");

const getAllServices = async (req, res) => {
  const user_id = req.user._id;
  const services = await Service.find({ user_id }).sort({ createdAt: -1 });
  !services
    ? res.status(400).json({ error: "No service added yet" })
    : res.status(200).json(services);
};

const getAservice = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such service" });
  }
  const service = await Service.findById(id);
  if (!service) {
    return res.status(400).json({ error: "No such service" });
  }
  return res.status(200).json(service);
};

const createAservice = async (req, res) => {
  const {
    category,
    serviceTypes,
    serviceTypeDetails,
    typeOfData,
    typeOfDataDescription,
    typeOfDataDescriptionDetails,
    startDate,
    endDate,
  } = req.body;
  console.log(req.body);
  try {
    const user_id = req.user._id;
    const service = await Service.create({
      category,
      serviceTypes,
      serviceTypeDetails,
      typeOfData,
      typeOfDataDescription,
      typeOfDataDescriptionDetails,
      startDate,
      endDate,
      user_id,
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAservice = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: " No such Service" });
  }
  const service = await Service.findByIdAndDelete(id);
  return res.status(200).json(service);
};

const deleteAllServices = async (req, res) => {
  await Service.deleteMany({});
  res.status(200).json({ message: "Services deleted" });
};

const updateAservice = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such service" });
  }
  const service = await Service.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!service) {
    return res.status(400).json({ error: "No such service" });
  }
  return res.status(200).json(service);
};

module.exports = {
  getAllServices,
  getAservice,
  createAservice,
  deleteAservice,
  updateAservice,
  deleteAllServices,
};
