const express = require("express");
const getGenrateZegoToken = require("../controller/token.controller.js");
const route = express.Router();

route.post("/genrate-token", getGenrateZegoToken.genrateZegoToken);

module.exports = route;