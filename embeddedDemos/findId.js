const jsonfile = require('jsonfile')
var fs = require('fs');

var jsonData = fs.readFileSync('./AachenProp.json', {encoding: 'utf8'})
let data = JSON.parse(jsonData);

var val = "00dW6J7UbEef_pvmjWlYgv";

var index = data[0].metaObjects.filter(function (item) {
    return item.id==val;
  });



var index2 = data[0].metaObjects.findIndex(function(item, i){
    return item.id === val
  });
  

 console.log(index);
 console.log(index2);