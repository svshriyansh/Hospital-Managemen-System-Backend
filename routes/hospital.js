const express = require("express");
const { default: mongoose } = require("mongoose");
// const profile = require('../')
const Hospital = require("../models/hospital");
const routes = express.Router();
const { HOSPITAL_FEILDS } = require("../dbUtil");
const hospital = require("../models/hospital");
const authenticationToken = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

routes.post(
  "/hospitals",
  [
    check("hospitalName", "Name is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("sector", "Sector is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
  ],
  authenticationToken,
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      // console.log(Object.keys(error));
      // console.log(error.errors);
      // console.log(error.errors.msg);
      const err = {};
      let values = [];
      for (let i = 0; i < error.errors.length; i++) {
        // console.log(Object.keys(err).length);

        if (!Object.keys(err).length) {
          values.push(error.errors[i].msg);
          err["errors"] = values;
        } else {
          values.push(error.errors[i].msg);
          err["errors"] = values;
        }
      }
      // console.log(Object.keys(err).length);
      if (Object.keys(err.errors).length == 1) {
        console.log(JSON.stringify(err));
      }
      return res.send(err);
    }
    try {
      const feilds = new Hospital({
        ...req.body,
      });
      await feilds.save();
      res.send(feilds);
    } catch (err) {
      console.log(err);
      res.send("Error");
    }
  }
);

routes.get("/", authenticationToken, async (req, res) => {
  try {
    const hospital = await Hospital.find();
    res.json(hospital);
  } catch (err) {
    res.send(err);
  }
});
routes.get("/hospitals/:id", authenticationToken, async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    res.json(hospital);
  } catch (err) {
    res.send(err);
  }
});

routes.put("/hospitals/:id", authenticationToken, async (req, res) => {
  try {
    const keys = Object.keys(HOSPITAL_FEILDS);
    const update = {};
    for (let i = 0; i < keys.length; i++) {
      if (req.body[HOSPITAL_FEILDS[keys[i]]]) {
        update[HOSPITAL_FEILDS[keys[i]]] = req.body[HOSPITAL_FEILDS[keys[i]]];
      } else {
        return res.send(`Feild missing ${HOSPITAL_FEILDS[keys[i]]}`);
      }
    }
    await Hospital.findByIdAndUpdate(req.params.id, update);
    res.send("Updated");
  } catch (err) {
    res.send(err);
  }
});

routes.delete("/hospitals/:id", authenticationToken, async (req, res) => {
  try {
    const feild = await Hospital.deleteOne({ _id: req.params.id });
    res.json(feild);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

module.exports = routes;
