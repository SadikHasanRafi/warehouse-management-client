const { MongoClient, ServerApiVersion } = require('mongodb');const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000;
const app = express();
app.use(cors());
app.use(express.json());

//user:admin01
//password:nUIUD1oXeFhPWbdM


const uri = "mongodb+srv://USER:PASS@cluster0.kg2k3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("inventoryProduct").collection("products");
  // perform actions on the collection object
  
  client.close();
});


app.get('/', (req, res) => {
    res.send('Server is responding')
  })

 
app.get('/addproduct',(req,res)=>{
    res.send("add product page")
})


  
  

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
