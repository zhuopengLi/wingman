const jsonfile = require('jsonfile')
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
//initializing the two libraries that are used + mqttbroker

let typeOfSensor = ["temperature", "waterlevel", "moisture", "co2Concentration"]
// types of sensors that are stored in different columns in the sensor matrix
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {
   //connecting to the mqtt broker
    if (!err) {
    let matrix = [];
   for(var k=0; k<50; k++) {
      let randomNumbers = [];
       for (var i = 1; i <= 4; i++) {
       var value = Math.random() * (20 - 10) + 10;
       let index = i-1;
       randomNumbers[index] = value;  
       }
       matrix[k] = randomNumbers;
       console.table(matrix);
   }
   // creating a matrix with randomly generated sensor data with (i) columns and (k) lines 
   // nessesarily coresponding to the type of sensor columns
      let stringNum = matrix.toString();
      client.publish('presence', stringNum)
      // break up the matrix into one fluent string to publish it in the MQTT 
    }
  })
})
 

client.on('message', function (topic, message) {
  // connecting to the mqtt broker to receive the messages published
  let test = message.toString()
  let arrayTest = test.split(",");
  // receive string and once again split it up into the individual numbers (string)
  let matrixAfterMQTT = [];
  let p = 0
  for(var l=0; l<50; l++) {
    let randomNumbersAfterMQTT = [];
      for (var m = 1; m <= 4; m++) {
        let indexMQTT = m-1
        let indexArray = indexMQTT+p;
        let valuesAfterMQTT = arrayTest[indexArray];
       //recreate the matrix containing data from each sensor 
        // creating a matrix with randomly generated sensor data with (m) columns and (l) lines 
     randomNumbersAfterMQTT[indexMQTT] = valuesAfterMQTT;
      }
      matrixAfterMQTT[l] = randomNumbersAfterMQTT;
      p = p+4;
  }
  client.end()
  //matrixAfterMQTT is the end product of this part of the code
 
  const file = 'AachenProp.json'
  jsonfile.readFile(file, function (err, obj) {
  if (err) console.error(err)

  for (var l = 0; l <= 49; l++) {
  for (var j = 0; j <= 3; j++) {
    obj['metaObjects'][l][typeOfSensor[j]] = matrixAfterMQTT[l][j];
    // read the example.json file into (obj). modify (obj) in certain lines
  }
}
  console.dir(obj)
  jsonfile.writeFile(file, obj)
  // push the (obj) into the former file
})
})