const express = require("express");


const movieRoutes = require("./routes/movieRoutes");
const filmpageRoutes = require("./routes/filmpageRoutes");
const MembersRoutes = require("./routes/MembersRoutes");

const db = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use("/api", movieRoutes);
app.use("/api", filmpageRoutes);
app.use("/api", MembersRoutes)

// Catch-all route to verify that the app is running
app.use("/", (req, res) => {
  res.json({ message: "App is running!" });
});

// Start Server and DB
const PORT = process.env.PORT || 5000;
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
