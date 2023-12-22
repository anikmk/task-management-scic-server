const express = require('express')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// taskManagement
// oyrEt4gNs8mU3GMy
console.log(process.env.DB_USER)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@anik.34iapyi.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
     // collection 
    const createTaskCollection = client.db("task").collection("createTask")

  // task post request api
    app.post('/createTask', async(req,res)=>{
      const task = req.body;
      const result = await createTaskCollection.insertOne(task);
      res.send(result);
    })
    
    // task get request api
    app.get('/createTask/:email',async(req,res)=>{
      const email = req.params.email;
      const query = {email: email}
      const result = await createTaskCollection.find(query).toArray();
      res.send(result)
    })
    // task delete api
    app.delete('/deleteTask/:id',async(req,res)=>{
      const  id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await createTaskCollection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello from task management Server..')
  })
  
  app.listen(port, () => {
    console.log(`task management is running on port ${port}`)
  })