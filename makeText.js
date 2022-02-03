/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function makeText(path) {
    fs.readFile(path, "utf8", function callBack(err, data) {
      if (err) {
        console.error(`Can't read file: ${path}: ${err}`);
        process.exit(1);
      } else {
        generateText(data);
      }
    });
}

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Can't read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}
else if (method === "url") {
  makeURLText(path);
}
else {
  console.error(`Unable to use method: ${method}`);
  process.exit(1);
}