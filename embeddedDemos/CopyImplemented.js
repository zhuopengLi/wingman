const jsonfile = require('jsonfile')

// const mqtt = require('mqtt')

// const client  = mqtt.connect('mqtt://test.mosquitto.org')

var fs = require('fs');

const MongoClient = require('mongodb').MongoClient;

//////////////////////////////////methods///////////////////////////////////////////////////////////

Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === el) {
            idxs.unshift(i);
        }
    }
    return idxs;
};

////////////////////////////////////////////Variables///////////////////////////////////////////////////

let sensorIds = [];
let realTime = [];
let interpolateTempRound = [];
var dates = [];
let numbers = [];
let typeOfSensor = [];
let typeOfSensorPipe = [];
let timestampValue;

////////////////////////////////////Interval start/////////////////////////////////////////////

let choosenList = ['SensorList.txt','SensorListPipes.txt']
let choosenValues = ['/Users/hannes/documents/Repos/zhuopengli.github.io/xeokit-bim-viewer/app/data/projects/Aachen/models/terrain/terrain.json','/Users/hannes/documents/Repos/zhuopengli.github.io/xeokit-bim-viewer/embeddedDemos/AachenPipes.json']

let chooseCollection = ['Terrain','Pipes']


setInterval(function(){ 




    ////////////////////////////////////storing SensorIds in an Array/////////////////////////////////////////////
    for (var c = 0; c < 1; c++) {

    

        sensorIds = fs.readFileSync(choosenList[c]).toString().split("\n");
        console.log(c);
        for(i in sensorIds) {
            //console.log(sensorIds[i]);
        }
        //console.table(sensorIds);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // sensorIdsPipes = fs.readFileSync('SensorListPipes.txt').toString().split("\n");
        // for(i in sensorIdsPipes) {
        //     //console.log(sensorIds[i]);
        // }

        ////////////////////////////////////storing Dates in an Array/////////////////////////////////////////////////

        dates = fs.readFileSync('dates.txt').toString().split("\n");
        for(i in dates) {
            //console.log(dates[i]);
        }
        //console.table(dates);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////



        realTime = upToDate();

        stringDate = liveStringDate(realTime);

        // console.log(stringDate);

        indices = dates.multiIndexOf(stringDate);

        // console.log(indices);

        temperatureCurrentDay = interpolate(indices, realTime[7], realTime[8],c);

        timestampValue = realTime[2] + "."+ realTime[1] +"."+ realTime[3] + " , " + realTime[7] + ":" + realTime[8] + ":" + realTime[9] ;

        

        ///////////////////////////////////////////current sensor valies are defined//////////////////////////////////////

        ///////////////////////////////////////////current temperature is defined//////////////////////////////////////

        let matrixAfterMQTT = [];
        let varinace = 0.01;
        let numberOfProperties = 6;


        for (var l = 0; l < sensorIds.length; l++) {
            let randomNumbersAfterMQTT = [];
            for (var m = 1; m <= numberOfProperties; m++) {
                let indexMQTT = m - 1
                let indexArray = indexMQTT;
                let valuesAfterMQTT = numbers[indexArray];


                valuesAfterMQTT = valuesAfterMQTT - valuesAfterMQTT * 0.5 * varinace + valuesAfterMQTT * varinace * Math.random();
                
                ///round numbers on two digits after 
                
                let multiplier = 100;
                valuesAfterMQTT = Math.round(valuesAfterMQTT * multiplier) / multiplier;

                //recreate the matrix containing data from each sensor 
                // creating a matrix with randomly generated sensor data with (m) columns and (l) lines 
                randomNumbersAfterMQTT[indexMQTT] = valuesAfterMQTT;
            }
            matrixAfterMQTT[l] = randomNumbersAfterMQTT;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var jsonData = fs.readFileSync(choosenValues[c], {encoding: 'utf8'})
        let data = JSON.parse(jsonData);



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

        ///////////////////////////////////////////////////////////////////////////////////

        // var jsonDataPipes = fs.readFileSync('./AachenPipes.json', {encoding: 'utf8'})
        // let dataPipes = JSON.parse(jsonDataPipes);



        // let propertiesSensorsPipes = [];
        // let indexSensorsPipes  = [];


        // for (var i = 0; i <= (sensorIdsPipes.length-1); i++) {
        
        // var valPipes = sensorIdsPipes[i].replace(/"/g,"");


        // var indexPipes = dataPipes.metaObjects.filter(function (item) {
        //     return item.id==valPipes;
        //   });



        // var index2Pipes = dataPipes.metaObjects.findIndex(function(item, i){
        //     return item.id === valPipes
        //   });
        
        

        //  propertiesSensorsPipes [i] = indexPipes;
        //  indexSensorsPipes [i] = index2Pipes;
        
        // }

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        

        let file = choosenValues[c]
        // jsonfile.readFile(file, function(err, obj) {

            let rawdata = fs.readFileSync(file);
            let obj = JSON.parse(rawdata);
          
            console.log(matrixAfterMQTT);

            // if (err) console.error(err)

            if (c == 0) {
            
            for (var l = 0; l <= (indexSensors.length-1); l++) {
                for (var j = 0; j < 6; j++) {


                    obj['metaObjects'][indexSensors[l]][typeOfSensor[j]] = matrixAfterMQTT[l][j];
                    obj['metaObjects'][indexSensors[l]]["timestamp"] = timestampValue;
                    // read the example.json file into (obj). modify (obj) in certain lines
                }
            }
            }

            if (c == 1) {
            
                for (var l = 0; l <= (indexSensors.length-1); l++) {
                    for (var j = 0; j < 1; j++) {
    
    
                        obj['metaObjects'][indexSensors[l]][typeOfSensorPipe[j]] = matrixAfterMQTT[l][j];
                        obj['metaObjects'][indexSensors[l]]["timestamp"] = timestampValue;
                        // read the example.json file into (obj). modify (obj) in certain lines
                    }
                }
                }

            

            // file = choosenValues[c]
            // jsonfile.writeFileSync(file, obj)
            // try {
            //     fs.writeFileSync(filePath, obj, 'utf8');
            //     console.log("The file was saved!");
            // }
            // catch(err) {
            // }
            // console.dir(obj)

        

            // const filePath = 'AachenProp.json';
            

        // Do something with file


            // jsonfile.writeFileSync(file, obj)
            
            // jsonfile.writeFile(file, obj, { spaces: 2, EOL: '\r\n' }, function (err) {
            //     if (err) console.error(err)
            //   })
            
            let choosenDB = ['TerrainDB','PipesDB']
            
            uri = "mongodb+srv://teamLemonade:fruity2021@cluster0.s5fyv.mongodb.net/JSONFiles?retryWrites=true&w=majority";
        
            MongoClient.connect(uri, function(err, client) {
                if(err) {
                    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
                }
                // console.log('Connected...');
                const collection = client.db("test").collection("devices");
                // perform actions on the collection object
                client.close();
            });
                
            let ids = ["3rFeaDCe58Ph8ptbjJL$5m","3rFeaDCe58Ph8ptbjJL$vK","3rFeaDCe58Ph8ptbjJL$vQ","3rFeaDCe58Ph8ptbjJL$v1","3rFeaDCe58Ph8ptbjJL$vo"];

            
            MongoClient.connect(uri, function(err, db) {
                if (err) throw err;
                var dbo = db.db("Sensors");
                for (var b = 0; b < 5; b++) {
                var myquery = { id: ids[b] };
                
                // console.log(matrixAfterMQTT)
                var newvalues = {$set: {NoiseLevel: matrixAfterMQTT[b][5]}};
                dbo.collection("Sensors").updateMany(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                });
                  
                    newvalues = {$set: {windspeed: matrixAfterMQTT[b][2]}};
                dbo.collection("Sensors").updateMany(myquery, newvalues, function(err, res) {
                    if (err) throw err;   
                });

                newvalues = {$set: {moisture: matrixAfterMQTT[b][1]}};
                dbo.collection("Sensors").updateMany(myquery, newvalues, function(err, res) {
                    if (err) throw err; 
                });

                newvalues = {$set: {temperatures: matrixAfterMQTT[b][0]}};
                dbo.collection("Seonsors").updateMany(myquery, newvalues, function(err, res) {
                    if (err) throw err;   
                });

                newvalues = {$set: {ozone: matrixAfterMQTT[b][4] }};
                dbo.collection("Seonsors").updateMany(myquery, newvalues, function(err, res) {
                    if (err) throw err;   
                });

                newvalues = {$set: {timestamp: timestampValue}};
                dbo.collection("Seonsors").updateMany(myquery, newvalues, function(err, res) {
                    if (err) throw err;   
                });


                newvalues = {$set: {winddirection: matrixAfterMQTT[b][3]}};
                dbo.collection("Seonsors").updateMany(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                //   console.log(res.result.nModified + " document(s) updated");
                  db.close();
                });
            }
              });
            


         //     // var myquery = data.metaObjects;
            //     // dbo.collection("customers").deleteMany(myquery, function(err, obj) {
            //     //   if (err) throw err;
            //     //   console.log("1 document deleted");
            //     //   console.log(obj.result.n + " document(s) deleted");
            //     //   db.close();
            //     // });
            //     // console.log(data.metaObjects[3]);
            //     // var myquery = obj.metaObjects[3];
            //     // dbo.collection("IFC").deleteMany(myquery, function(err, obj) {
            //     //   if (err) throw err;
            //     //   console.log(obj.result.n + " document(s) deleted");
            //     //   db.close();
            //     // });



            ///////////////////////////////////////create database////////////////////////////////////////////////////////////

            // MongoClient.connect(uri, function(err, db) {
            //     if (err) throw err;
            //     var dbo = db.db("Sensors");

            //     console.log(indexSensors);

            //     var myobj = [];
            //     for (var l = 0; l <= (indexSensors.length-1); l++) {
            //     myobj[l] = obj.metaObjects[indexSensors[l]];

            //     }
            // //     // console.log(myobj);

            //     let collection = chooseCollection[c];
            //     dbo.collection("Sensors").insertMany(myobj, function(err, res) {
            //     if (err) throw err;
            //     console.log("Number of documents inserted " + res.insertedCount + "in Database "+ c + choosenDB[c]);
            //     db.close();
            //     });
            // });

        // } )



    }

}, 5000);

////////////////////////////////////Functions////////////////////////////////////////////////////////////////


////////////////////////////////////stores current time data in array////////////////////////////////////////


function upToDate() {
    // new Date object
    let now = new Date();
    let stringNow = now.toString();
    let splitDate = stringNow.split(" ");
    // create all variables that consist data about the moment
    let weekday = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];
    let year = splitDate[3];
    let time = splitDate[4];
    let timeZone = splitDate[5];
    let timeZoneWritten = splitDate[6] + " " + splitDate[7] + " " + splitDate[8] + " " + splitDate[9];

    let splitTime = time.split(":");

    let hour = splitTime[0];
    let minutes = splitTime[1];
    let seconds = splitTime[2];

    return [weekday, month, day, year, time, timeZone, timeZoneWritten, hour, minutes, seconds]
}

/////////////convertes today's date into the right format to match it with the sensor data/////////////////////////

function liveStringDate(realTime) {

    let dayInMonth = realTime[2];
    let yearInTime = "2020";
    let monthInYear;
    if (realTime[1] == "Feb") {
        monthInYear = "02";
    }
    let stringDate = dayInMonth + "." + monthInYear + "." + yearInTime;
    let stringTodate = dayInMonth + "." + monthInYear + ".2021";
    return stringDate;
}


////////////////////////interpolates values out of data base with the currewnt hour////////////////////////////////


function interpolate(indices, hour, minute, c) {

    typeOfSensor = ["temperatures", "moisture", "windspeed", "winddirection", "ozone", "NoiseLevel"]
    typeOfSensorPipe = ["waterlevel"];

    let interpolateTemp = [];

    if (c == 0) {

    for (var k = 0; k < 6; k = k + 1) {


        let filename = typeOfSensor[k] + ".txt"
        try {
            var data = fs.readFileSync(filename, 'utf8');
            temperatures = data.toString().split("\n");
        } catch (e) {
            console.log('Error:', e.stack);
        }


        let n = 0;
        let currentTemperature = [];
        
        while (n < 24) {
            currentTemperature[n] = (temperatures[indices[n]]);
            n++;
        }
        //console.log(indices);
        //console.log(currentTemperature);
        var minutes = parseInt(minute)
        var percent = minutes / 60;

        let oldHour = parseInt(hour);
        let newHour = parseInt(hour) + 1;

        //console.log (oldHour);
        
        let oldCurrentTemperature = currentTemperature[oldHour].split(",");
        let freshCurrentTemperature = currentTemperature[newHour].split(",");

        let oldTemperature = [];
        let newTemperature = [];

        if (oldCurrentTemperature.length == 2) {

            oldTemperature = parseInt(oldCurrentTemperature[0]) + parseInt(oldCurrentTemperature[1]) / 10;
            newTemperature = parseInt(freshCurrentTemperature[0]) + parseInt(freshCurrentTemperature[1]) / 10;
        } else {
            oldTemperature = parseInt(oldCurrentTemperature[0])
            newTemperature = parseInt(freshCurrentTemperature[0])

        }

        interpolateTemp = oldTemperature + (newTemperature - oldTemperature) * percent;

        let multiplier = 100;
        interpolateTempRound = Math.round(interpolateTemp * multiplier) / multiplier;

        //console.log(k);
        //console.log("The current " + filename + " is " + interpolateTempRound);

        numbers[k] = interpolateTempRound;
    

        

    }  
  }

  if (c == 1) {

    for (var k = 0; k < 1; k = k + 1) {


        let filename = typeOfSensorPipe[k] + ".txt"
        try {
            var data = fs.readFileSync(filename, 'utf8');
            temperatures = data.toString().split("\n");
        } catch (e) {
            console.log('Error:', e.stack);
        }


        let n = 0;
        let currentTemperature = [];
        
        while (n < 24) {
            currentTemperature[n] = (temperatures[indices[n]]);
            n++;
        }
        //console.log(indices);
        //console.log(currentTemperature);
        var minutes = parseInt(minute)
        var percent = minutes / 60;

        let oldHour = parseInt(hour);
        let newHour = parseInt(hour) + 1;

        //console.log (oldHour);
        
        let oldCurrentTemperature = currentTemperature[oldHour].split(",");
        let freshCurrentTemperature = currentTemperature[newHour].split(",");

        let oldTemperature = [];
        let newTemperature = [];

        if (oldCurrentTemperature.length == 2) {

            oldTemperature = parseInt(oldCurrentTemperature[0]) + parseInt(oldCurrentTemperature[1]) / 10;
            newTemperature = parseInt(freshCurrentTemperature[0]) + parseInt(freshCurrentTemperature[1]) / 10;
        } else {
            oldTemperature = parseInt(oldCurrentTemperature[0])
            newTemperature = parseInt(freshCurrentTemperature[0])

        }

        interpolateTemp = oldTemperature + (newTemperature - oldTemperature) * percent;

        let multiplier = 100;
        interpolateTempRound = Math.round(interpolateTemp * multiplier) / multiplier;

        //console.log(k);
        //console.log("The current " + filename + " is " + interpolateTempRound);

        numbers[k] = interpolateTempRound;

        //console.log(numbers);

    }  
}
    return numbers;
}


/////////////////////////////////////////////////////////////////////////////////////////////////
