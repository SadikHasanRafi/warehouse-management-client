const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId

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
    res.send({succes:true})
})
//___________________________________________________________________________

//show product
async function getProducts () {
  try{
      await client.connect();
      
      const cursor = productCollection.find()
      const products =await cursor.toArray()
      return products
  }
  finally{
      await client.close();
  }
}
app.get('/showproduct', async(req,res) => {
  
  const products = await getProducts().catch(console.dir)
  res.send(products)
})
//____________________________________________________________________________


//show one product's details 
async function getOneProduct (id){
  try{
    await client.connect();
    const search = {_id:ObjectId(id)}
    const product = await productCollection.findOne(search)
    return product
  }
  finally{
    await client.close();
  }
}
app.get('/showproductdetails/:id', async (req,res) => {
  
  const id = req.params.id
  const result = await getOneProduct(id).catch(console.dir)
  
  res.send(result)
})
//___________________________________________________________________________


//Update product
async function updateOneProduct(id,updateProduct){
  try {
    await client.connect();
    const option = { upsert: true }
    const updatedDoc = {
      $set: {
        quantity:updateProduct.quantity
      }
    }
    const result = await productCollection.updateOne(id,updatedDoc,option)
    return result
  } finally {
    await client.close();
  }
}
app.put('/showproductdetails/:id', async (req,res) => {
  let id = id.params.id
  const updateProduct = req.body
  id = { _id : ObjectId(id) }
  const result = updateOneProduct(id,updateProduct)
  res.send(result)
})






app.get('/', (req, res) => {
    res.send('Server is responding')
  })

 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
