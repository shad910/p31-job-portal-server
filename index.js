require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = process.env.MDB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CAREER-CODE server is running...........");
});

const run = async () => {
  try {
    // await client.connect();
    console.log("You successfully connected to MongoDB!");

    const jobPortal = client.db("jobPortal");
    const categoryCollection = jobPortal.collection("categories");
    const jobsCollection = jobPortal.collection("jobs");
    const applicationCollection = jobPortal.collection("applications");

    // Categories GET API
    app.get("/categories", async (req, res) => {
      try {
        const result = await categoryCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500);
      }
    });

    // Job Detail GET API
    app.get("/jobs", async (req, res) => {
      try {
        const result = await jobsCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500);
      }
    });

    // Job Detail GET API with ID
    app.get("/jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await jobsCollection.findOne(query);
        res.status(200).send(result);
      } catch (error) {
        res.status(500);
      }
    });

    // Job Details POST API
    app.post("/jobs", async (req, res) => {
      try {
        const data = req.body;
        const result = await jobsCollection.insertOne(data);
        res.status(200).send(result);
      } catch (error) {
        res.status(500);
      }
    });

    //Job Details UPDATE(PATCH) API with ID
    app.patch("/jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const count = req.body;
        if (!count) {
          return res.status(400).json({ message: "Invalid count" });
        }
        const updateDoc = { $set: count };
        const result = await jobsCollection.updateOne(filter, updateDoc);
        res.status(200).send(result);
      } catch (error) {
        res.status(500);
      }
    });

    // Job Details DELETE API with ID
    app.delete("/job/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await jobsCollection.deleteOne(query);

        if (result.deletedCount === 1) {
          res.status(200).send(result);
        } else {
          res.status(404);
        }
      } catch (error) {
        res.status(500);
      }
    });

    // Application GET API with Query(Email)
    app.get("/applications", async (req, res) => {
      try {
        const email = req.query.email;
        const query = { applicant: email };
        const result = await applicationCollection.find(query).toArray();

        // bad way to aggregate data
        for (const application of result) {
          const jobID = application.jobID;
          const jobQuery = { _id: new ObjectId(jobID) };
          const job = await jobsCollection.findOne(jobQuery);
          application.company_logo = job.company_logo;
          application.company = job.company;
          application.location = job.location;
          application.title = job.title;
          application.jobType = job.jobType;
          application.salaryRange = job.salaryRange;
        }

        res.status(200).send(result);
      } catch (error) {
        res.status(500);
      }
    });

    // Application POST API
    app.post("/applications", async (req, res) => {
      try {
        const data = req.body;
        console.log(data);
        const result = await applicationCollection.insertOne(data);
        res.status(200).send(result);
      } catch (error) {
        res.status(500);
      }
    });

    // Application Details DELETE API with ID
    app.delete("/applications/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await applicationCollection.deleteOne(query);

        if (result.deletedCount === 1) {
          res.status(200).send(result);
        } else {
          res.status(404);
        }
      } catch (error) {
        res.status(500);
      }
    });
  } finally {
  }
};
run().catch(console.dir);

app.listen(port, () => {
  console.log(` CAREER-CODE server is running on this ${port} port.`);
});
