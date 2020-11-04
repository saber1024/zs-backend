// import express from "express";
// import { getVideoInfo } from ".js";
const express = require("express");
const getVideoInfo = require("../controller/downloadController");

const router = express.Router();

router.route("/").post(getVideoInfo);

module.exports = router;
