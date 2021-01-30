const MongoClient = require('mongodb').MongoClient;
var fs = require('fs'); // method that I'm using to read the sensor databases
const jsonfile = require('jsonfile') //


let realTime = []; // array with lots of information about the current date
let interpolateTempRound = [];

var dates = []; // all the dates that were recorded by the sensor
fs.readFile('dates.txt', function(err, data) {
    if(err) throw err;
    dates = data.toString().split("\n"); // split the .txt into an array conceiving the dates
    for(i in dates) {
     }
    
    realTime = myFunction(); // call the function that gives us ([weekday, month, day, year, time, timeZone, timeZoneWritten, hour, minutes, seconds]) info about the present and stores them in the array
    
    stringDate = liveStringDate(realTime); // call the function that recomputes the date using the structure in the dates.txt file
    
    indices = dates.multiIndexOf(stringDate); // have a look at what indices today's temperature is located... 

    console.log(indices);

    temperatureCurrentDay = temper(indices,realTime[7],realTime[8]); // get the temperature 2 years ago, giving the location in the array + the specific hour + the minutes within that hour

    console.log(numbers);

     let matrixAfterMQTT = []; 
     let varinace = 0.01;

    for(var l=0; l<50; l++) {
        let randomNumbersAfterMQTT = [];
          for (var m = 1; m <= 5; m++) {
            let indexMQTT = m-1
            let indexArray = indexMQTT;
            let valuesAfterMQTT = numbers[indexArray];

            
            valuesAfterMQTT = valuesAfterMQTT - valuesAfterMQTT*0.5*varinace + valuesAfterMQTT*varinace*Math.random();
            let multiplier = 100;
            valuesAfterMQTT = Math.round(valuesAfterMQTT * multiplier) / multiplier;
           
            //recreate the matrix containing data from each sensor 
            // creating a matrix with randomly generated sensor data with (m) columns and (l) lines 
         randomNumbersAfterMQTT[indexMQTT] = valuesAfterMQTT;
          }
          matrixAfterMQTT[l] = randomNumbersAfterMQTT;
      }

    console.table(matrixAfterMQTT);
    console.log(Math.random());

    const file = 'AachenProp.json'
    jsonfile.readFile(file, function (err, obj) {
    if (err) console.error(err)

    for (var l = 0; l <= 49; l++) {
    for (var j = 0; j <= 4; j++) {
    obj['metaObjects'][l][typeOfSensor[j]] = matrixAfterMQTT[l][j];
  // read the example.json file into (obj). modify (obj) in certain lines
}
}
    console.dir(obj)
    jsonfile.writeFile(file, obj)

    // replace the uri string with your connection string.
var uri = "mongodb+srv://teamLemonade:fruity2021@cluster0.s5fyv.mongodb.net/JSONFiles?retryWrites=true&w=majority"



   MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    var myobj = { name: "Company Inc", address: "Highway 37" };

    console.log(myobj);
    dbo.collection("NameOfFolder").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });

});
// push the (obj) into the former file
})

;






function myFunction() {
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



Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === el) {
            idxs.unshift(i);
        }
    }
    return idxs;
};

function liveStringDate (realTime) {

    let dayInMonth = realTime[2];
    let yearInTime = "2020";
    let monthInYear;
     if (realTime[1] == "Jan"){
     monthInYear = "01";
 }
    let stringDate = dayInMonth + "." + monthInYear + "." + yearInTime;
    return stringDate;
}

let typeOfSensor = [];
let numbers = [];

function temper (indices, hour, minute) {
    
    typeOfSensor = ["temperatures", "moisture", "windspeed", "winddirection", "ozone"]

    let interpolateTemp = [];
    
    for(var k=0; k<5; k = k+1) {

        
        let filename = typeOfSensor[k]+ ".txt"
        try {  
            var data = fs.readFileSync(filename, 'utf8');
            temperatures = data.toString().split("\n");
        } catch(e) {
            console.log('Error:', e.stack);
        }
        
        
        let n = 0;
        let currentTemperature = [];
        while (n < 24) {
           currentTemperature[n] = (temperatures[indices[n]]);
            n++;
        }
    
        var minutes = parseInt(minute)
        var percent = minutes/60;
    
        let oldHour = parseInt(hour);
        let newHour = parseInt(hour) + 1;
    
        let oldCurrentTemperature = currentTemperature[oldHour].split(",");
        let freshCurrentTemperature = currentTemperature[newHour].split(",");

        let oldTemperature = [];
        let newTemperature = [];

        if (oldCurrentTemperature.length==2){
    
        oldTemperature = parseInt(oldCurrentTemperature[0]) + parseInt(oldCurrentTemperature[1])/10;
        newTemperature = parseInt(freshCurrentTemperature[0]) + parseInt(freshCurrentTemperature[1])/10;
        }
        else 
        {
        oldTemperature = parseInt(oldCurrentTemperature[0])
        newTemperature = parseInt(freshCurrentTemperature[0])

        }
    
        interpolateTemp = oldTemperature + (newTemperature-oldTemperature)*percent;
    
        let multiplier = 100;
        interpolateTempRound = Math.round(interpolateTemp * multiplier) / multiplier; 
    
        console.log(k);
        console.log("The current " + filename + " is " + interpolateTempRound);

        numbers[k] = interpolateTempRound;

        console.log(numbers);

    
    
        
    }

    
     }


/*function moisture (indices, hour, minute) {
    

    let interpolateMoist = [];
    
    fs.readFile('moisture.txt', function(err, data) {
        if(err) throw err;
        moistures = data.toString().split("\n");
        
        let n = 0;
        let currentMoisture = [];
        while (n < 24) {
           currentMoisture[n] = (moistures[indices[n]]);
            n++;
        }
    
    var minutes = parseInt(minute)
    var percent = minutes/60;
    
    let oldHour = parseInt(hour);
    let newHour = parseInt(hour) + 1;
    
    let oldCurrentMoisture = currentMoisture[oldHour].split(",");
    let freshCurrentMoisture = currentMoisture[newHour].split(",");
    
    let oldMoisture = parseInt(oldCurrentMoisture[0]) + parseInt(oldCurrentMoisture[1])/10;
    let newMoisture = parseInt(freshCurrentMoisture[0]) + parseInt(freshCurrentMoisture[1])/10;
    
    interpolateMoist = oldMoisture + (newMoisture-oldMoisture)*percent;
    
    let multiplier = 100;
    interpolateMoistRound = Math.round(interpolateMoist * multiplier) / multiplier; 
    
    console.log("The current moisture is " + interpolateMoistRound);

    
    
    });


    
     }
     */

/*
function windspeed (indices, hour, minute) {
    

    let interpolateMoist = [];
    
    fs.readFile('moisture.txt', function(err, data) {
        if(err) throw err;
        moistures = data.toString().split("\n");
        
        let n = 0;
        let currentMoisture = [];
        while (n < 24) {
           currentMoisture[n] = (moistures[indices[n]]);
            n++;
        }
    
    var minutes = parseInt(minute)
    var percent = minutes/60;
    
    let oldHour = parseInt(hour);
    let newHour = parseInt(hour) + 1;
    
    let oldCurrentMoisture = currentMoisture[oldHour].split(",");
    let freshCurrentMoisture = currentMoisture[newHour].split(",");
    
    let oldMoisture = parseInt(oldCurrentMoisture[0]) + parseInt(oldCurrentMoisture[1])/10;
    let newMoisture = parseInt(freshCurrentMoisture[0]) + parseInt(freshCurrentMoisture[1])/10;
    
    interpolateMoist = oldMoisture + (newMoisture-oldMoisture)*percent;
    
    let multiplier = 100;
    interpolateMoistRound = Math.round(interpolateMoist * multiplier) / multiplier; 
    
    console.log("The current moisture is " + interpolateMoistRound);

    
    
    });


    
     }


     */