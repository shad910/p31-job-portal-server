require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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
        
        console.log("You successfully connected to MongoDB!");
    } finally {
        
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on this ${port} port.`)
})
