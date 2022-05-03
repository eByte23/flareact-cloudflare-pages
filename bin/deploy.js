#!/usr/bin/bash
const fs = require("fs");

fs.rename("dist/worker.js", "out/_worker.js", () => {
  console.log("file moved");
});
