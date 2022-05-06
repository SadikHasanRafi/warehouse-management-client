const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000;
const app = express();
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
