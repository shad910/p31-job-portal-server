require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = process.env.MDB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running")
});

const run = async () => {
    try {
        const jobPortal = client.db("jobPortal");
        const jobsCollection = jobPortal.collection("jobs");

        // Jobs API
        app.get("/jobs", async (req, res) => {    
            const result = await jobsCollection.find().toArray();
            res.send(result);
        });

        // Job Detail API
        app.get("/jobs/:id", async (req, res) => {   
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }; 
            const result = await jobsCollection.findOne(query);
            res.send(result);
        });

        console.log("You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on this ${port} port.`)
})
