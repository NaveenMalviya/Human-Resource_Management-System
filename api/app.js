const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5080;

const uri = "mongodb+srv://naveenmalviya:BenArc%4010s@cluster0.1oua50h.mongodb.net/HRMS?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
.then(() => console.log("✅ Mongoose connected to MongoDB Atlas"))
.catch(err => console.error("❌ Mongoose connection error:", err));

// Middlewares
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// ✅ Allow both Netlify and local frontend
app.use(cors({
  origin: ["https://humanresourcemanagementsystem.netlify.app", "http://localhost:3000"]
}));

// Static files
app.use(express.static('public'));

// Routes
app.use('/api', router);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
