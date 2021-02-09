const jsonfile = require('jsonfile')
var fs = require('fs');

var jsonData = fs.readFileSync('./AachenProp.json', {encoding: 'utf8'})
let data = JSON.parse(jsonData);


var sensorIds = fs.readFileSync('SensorList.txt').toString().split("\n");
for(i in sensorIds) {
    //console.log(sensorIds[i]);
}
//console.table(sensorIds);

let propertiesSensors = [];
let indexSensors  = [];


for (var i = 0; i <= (sensorIds.length-1); i++) {
 
var val = sensorIds[i].replace(/"/g,"");


var index = data.metaObjects.filter(function (item) {
    return item.id==val;
  });



var index2 = data.metaObjects.findIndex(function(item, i){
    return item.id === val
  });
 
  

 propertiesSensors [i] = index;
 indexSensors [i] = index2;
 
}


