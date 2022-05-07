const { MongoClient, ServerApiVersion } = require('mongodb');const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000;
const app = express();

//using middleware
app.use(cors());
app.use(express.json());

//user:admin01
//password:nUIUD1oXeFhPWbdM

//connection with mongodb
const uri = "mongodb+srv://USER:PASS@cluster0.kg2k3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function mongoServer() {
    try {
        await client.connect(err => {
            const productCollection = client.db("inventoryProduct").collection("products");
            
            
            //insert data in database
            app.post('/addproduct',async (req,res)=>{
    
                const newProduct = req.body;
                console.log(newProduct)
                const result = await productCollection.insertOne(newProduct)
                res.send(result)
            })
            








            
            client.close();
          });          
    } catch (error) {
        console.error(error)        
    }
}
mongoServer().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is responding')
  })

 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
