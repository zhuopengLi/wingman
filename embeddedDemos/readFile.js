const fs = require('fs');

let rawdata = fs.readFileSync('AachenPipes.json');
let student = JSON.parse(rawdata);
console.log(student);