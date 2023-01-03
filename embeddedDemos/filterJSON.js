const jsonfile = require('jsonfile')
const fs = require('fs')

// const file = 'AachenProp.json'
//   jsonfile.readFile(file, function (err, rawData) {
//   if (err) console.error(err)
//   let jsObjects = JSON.parse(rawData);
//   console.log(jsObjects);
// })

let jsonData = fs.readFileSync('./AachenProp.json', {encoding: 'utf8'})

let data = JSON.parse(jsonData);
// console.log(data)
  //let jsObjects = JSON.parse(rawdata);
// var result = data.filter(obj => {
//     return obj.id === "0Q0u0BIPD4e9bmmeoEFNT_"
// })

// // secondtry = data.find(x => x.id === "black@gmail.com")

// // console.log(secondtry);

// var result2 = data.find(obj => {
//     return obj[0].metaObjects === "0Q0u0BIPD4e9bmmeoEFNT_"
//   })

// console.log("hier dein Element")
//    console.log(result)

//    console.log(data.indexOf('0Q0u0BIPD4e9bmmeoEFNT_'))


//    var index = -1;
//     var val = '0Q0u0BIPD4e9bmmeoEFNT_'
//     var filteredObj = data[0].metaObjects.findIndex(function(item, i){
//   if(meta.id === val){
//     index = i;
//     return i;
//   }
// });

// console.log(index);



// console.log(index + filteredObj);

//    console.log(find(result,data))

//    function find(needle, haystack) {
//     var results = [];
//     var idx = haystack.indexOf(needle);
//     while (idx != -1) {
//         results.push(idx);
//         idx = haystack.indexOf(needle, idx + 1);
//     }
//     return results;
// }

//    console.log("hier dein 2. Element")
//    console.log(result2) 
// // console.log(result2)
  
// console.log(getByValue(data, "0Q0u0BIPD4e9bmmeoEFNT_"));
//   //console.dir(obj)
// //   jsonfile.writeFile(file, obj)
//   // push the (obj) into the former file

  getByValue(data,"0Q0u0BIPD4e9bmmeoEFNT_")

function getByValue(arr, value) {

    for (var i=1, iLen=arr.length; i<iLen; i++) {
  
      if (arr[0].metaObjects.id == value)
      return arr[i];
    }
  }

      
console.log(i);




//   function getByValue4(arr, value) {
//     var o;
  
//     for (var i=1, iLen=5; i<iLen; i++) {
//       o = arr[i];
//       console.log(o)
  
//       for (var p in o) {
//         if (o.id(p) && o[p] == value) {
//           return o;
//         }
//       }
//     }
//   }
  



