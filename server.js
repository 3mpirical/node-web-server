const express = require("express"),
      app     = express(),
      colors  = require("colors"),
      hbs     = require("hbs"),
      fs      = require("fs");


// CONFIGURATION ===============
app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");


// MIDDLEWARE ===============
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `The date is now: ${now} | Method: ${req.method} | URL : ${req.url}`;

  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) {
      console.log("Could not write to server log".red);
      console.log(`${err}`.red);
    }
  });

  next();
});


// HELPERS ===============
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});
// ROUTES ===============

app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Home Page",
    currentYear: new Date().getFullYear(),
    welcomeMessage: "Welcome To Our Incredibly Boring Site!!"
  });
});


app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
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
