const express = require("express"),
      app     = express(),
      colors  = require("colors");


// CONFIGURATION ===============




// ROUTES ===============

app.get("/", (req, res) => {
  res.json(colors);
});


app.get("/about", (req, res) => {
  res.send("Hello from the About Page");
});


app.get("/bad", (req, res) => {
  res.json({
    serverError: "Request Not Valid"
  });
});




// SERVER START ===============
app.listen(3000, () => {
  console.log("The server has begun making requests".green);
});
