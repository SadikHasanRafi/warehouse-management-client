const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000;
const app = express();

//using middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://user01:0whyvhFBOechutYK@cluster0.kg2k3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const productCollection = client.db("test").collection("products");

// insert ne product in database
async function addNewProduct(product) {
  try {
    await client.connect();
    const result = await productCollection.insertOne(product)  
    console.log(`User inserted with id: ${result.insertedId}`)
  }
  finally{
    await client.close();
  }
}
app.post('/addproduct', (req,res)=>{
    const newProduct = req.body;
    addNewProduct(newProduct).catch(console.dir)
    res.send({succes:'data successfully found'})
})


//show all product
async function showAllProducts () {
  try{
      await client.connect();
      const cursor = productCollection.find({})
      const products =await cursor.toArray()
      return products
  }
  finally{
      await client.close();
  }
}
app.get('/names', async(req,res) => {
  const products = await showAllProducts().catch(console.dir)
  res.send(products)
})







app.get('/', (req, res) => {
    res.send('Server is responding')
  })

 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
