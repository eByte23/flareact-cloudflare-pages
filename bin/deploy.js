#!/usr/bin/bash
const fs = require("fs");

fs.rename("dist/worker.js", "dist/_worker.js", () => {
  console.log("file moved");
});
