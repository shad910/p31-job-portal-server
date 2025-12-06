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
    res.send("CAREER-CODE server is running...........")
});

const run = async () => {
    try {
        // await client.connect();
        const jobPortal = client.db("jobPortal");
        const categoryCollection = jobPortal.collection("category");
        const jobsCollection = jobPortal.collection("jobs");

        // Category API
        app.get("/category", async (req, res) => {
            try {
                const result = await categoryCollection.find().toArray();
                res.status(200).send(result).json({ success: true, result });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Jobs API
        app.get("/jobs", async (req, res) => {
            try {
                const result = await jobsCollection.find().toArray();
                res.status(200).send(result).json({ success: true, result });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Job Detail API
        app.get("/jobs/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await jobsCollection.findOne(query);
                res.status(200).send(result).json({ success: true, result });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Add a Job Details API
        app.post("/jobs", async (req, res) => {
            try {
                const data = req.body;
                const result = await jobsCollection.insertOne(data);
                res.status(200).json({ success: true, result });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        //Update Job Details API
        app.patch("/jobs/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const count = req.body;
                if (!count) {
                    return res.status(400).json({ message: 'Invalid count' });
                }
                const updateDoc = { $set: count };
                const result = await jobsCollection.updateOne(filter, updateDoc);
                res.status(200).send(result).json({ success: true, result });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        //Delete Job Details API
        app.delete("/job/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await jobsCollection.deleteOne(query);

                if (result.deletedCount === 1) {
                    res.status(200).json({ success: true, message: "Job deleted successfully" });
                } else {
                    res.status(404).json({ success: false, message: "Job not found" });
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });


        console.log("You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(` CAREER-CODE server is running on this ${port} port.`)
})
