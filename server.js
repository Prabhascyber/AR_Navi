const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(express.json());

// Save routes from admin panel
app.post("/save-route", (req, res) => {

  const { key, route } = req.body;
  const file = "public/routes.json";

  let data = {};

  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file));
  }

  data[key] = route;

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);