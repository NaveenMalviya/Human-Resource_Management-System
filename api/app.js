// const express = require('express');
// const router = require('./routes');
// const bodyParser = require('body-parser');
// const cors  = require('cors');
// const mongoose = require('mongoose');
// const app = express();
// const port = 5080; 

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({"extended":true})),

// app.use(cors());
// app.use('/api', router);

// // for image below
// app.use(express.static('public' ));
// app.use(bodyParser.json({ limit: '50mb' })); // Limit set here
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Limit set here

// mongoose.connect('mongodb://localhost:27017/HRMS', {
// //   useNewUrlParser: true,  
//   serverSelectionTimeoutMS: 30000, // Set a higher timeout value (e.g., 30 seconds) 
// });

// app.listen(port, () => {
//    console.log(`Example app listening at http://localhost:${port}`)
// })


const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors  = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5080;

// 🔐 Use Mongoose with MongoDB Atlas
const uri = "mongodb+srv://naveenmalviya:BenArc%4010s@cluster0.1oua50h.mongodb.net/HRMS?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Connect using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
.then(() => console.log("✅ Mongoose connected to MongoDB Atlas"))
.catch(err => console.error("❌ Mongoose connection error:", err));

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// API routes
app.use('/api', router);

// Serve static files (like images)
app.use(express.static('public'));

// Start server
app.listen(port, () => {
   console.log(`🚀 Server running at http://localhost:${port}`);
});
