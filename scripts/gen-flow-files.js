/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

// TODO: Generate files recursively.

console.log("Reading flow files...");
const modelFiles = fs.readdirSync(path.join(__dirname, "../src"));

console.log("Writing flow files...");

for (let file of modelFiles) {
  const oldFile = path.join(__dirname, "../src", file);
  const newFile = path.join(__dirname, "../lib", `${file}.flow`);
  const buffer = fs.readFileSync(oldFile);
  fs.writeFileSync(newFile, buffer);
}
