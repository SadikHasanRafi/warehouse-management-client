const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000;
const app = express();

//using middleware
app.use(cors());
app.use(express.json());

// //user:user01
// //password:0whyvhFBOechutYK



const uri = "mongodb+srv://user01:0whyvhFBOechutYK@cluster0.kg2k3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("products");
//   console.log("ae123ta")
//   // perform actions on the collection object
//   client.close();
// });



async function run(product) {

  try {
    await client.connect();
    const userCollection = client.db("test").collection("products");

    const result = await userCollection.insertOne(product)  
    console.log(`User inserted with id: ${result.insertedId}`)

  }
  finally{
    // await client.close();
  }

}



// //connection with mongodb
// const uri = "mongodb+srv://admin01:nUIUD1oXeFhPWbdM@cluster0.kg2k3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



// async function mongoServer() {
//     console.log(client)
//     try {
//         // await client.connect( err => {
//             await client.connect();
//             const productCollection = client.db("inventoryProduct").collection("products");
            
//             const product = {
//                 name:"gtx 1660",
//                 price:23000,
//                 supplier:"zotac",
//                 pic:"img url",
//                 quantity:12
//             }

//             const result = await productCollection.insertOne(product)            
//             console.log(`user inserted with id ${result.insertedId}`)
           
//         //   });          
//     } 
//     // catch (err) {
//     //     console.error(err)        
//     // }
//     finally{
//         // await client.close();
//     }
// }
// mongoServer().catch(console.dir);


// insert data in database
app.post('/addproduct', (req,res)=>{
    const newProduct = req.body;
    run(newProduct).catch(console.dir)
    res.send({succes:'data successfully found'})
})



app.get('/', (req, res) => {
    res.send('Server is responding')
  })

 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
