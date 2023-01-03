const jsonfile = require('jsonfile')

// const mqtt = require('mqtt')

// const client  = mqtt.connect('mqtt://test.mosquitto.org')

var fs = require('fs');




let file = "AachenTerrain.json";

let object;


                // jsonfile.readFile(file, function(err, obj) {
                //     if (err) console.error(err)

                    
                //     object = obj.metaObjects[1]

                //     console.log(object)
                //     // return object
                    
                    
                // })

let rawdata = fs.readFileSync(file);
let object = JSON.parse(rawdata);


console.log(object);




// object = fs.readFile(file, (err, data) => {
//     if (err) throw err;
//     obj = JSON.parse(data);
//     return obj; 
// });

// console.log('This is after the read call');

// console.log(object);