const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const chatRoutes = require("./routes/chatRoutes");
app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
