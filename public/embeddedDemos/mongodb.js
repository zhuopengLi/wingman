const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
var uri = "mongodb+srv://teamLemonade:fruity2021@cluster0.s5fyv.mongodb.net/JSONFiles?retryWrites=true&w=majority"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});


/*
async function listDatabases(client){
    databases = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databases.databases.forEach(db => console.log(` - ${db.name}`));
};



async function main(){
    /*
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
    */
    uri = "mongodb+srv://teamLemonade:fruity2021@cluster0.s5fyv.mongodb.net/JSONFiles?retryWrites=true&w=majority";
 /*

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.err);

MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  */

  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
      { name: 'John', address: 'Highway 71'},
      { name: 'Peter', address: 'Lowstreet 4'},
      { name: 'Amy', address: 'Apple st 652'},
      { name: 'Hannah', address: 'Mountain 21'},
      { name: 'Michael', address: 'Valley 345'},
      { name: 'Sandy', address: 'Ocean blvd 2'},
      { name: 'Betty', address: 'Green Grass 1'},
      { name: 'Richard', address: 'Sky st 331'},
      { name: 'Susan', address: 'One way 98'},
      { name: 'Vicky', address: 'Yellow Garden 2'},
      { name: 'Ben', address: 'Park Lane 38'},
      { name: 'William', address: 'Central st 954'},
      { name: 'Chuck', address: 'Main Road 989'},
      { name: 'Viola', address: 'Sideway 1633'}
    ];
    dbo.collection("customers").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });