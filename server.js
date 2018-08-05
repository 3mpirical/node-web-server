const express = require("express"),
      app     = express(),
      colors  = require("colors"),
      hbs     = require("hbs"),
      fs      = require("fs");

const port = process.env.PORT || 3000;



// CONFIGURATION ===============
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");



// MIDDLEWARE ===============
// server.log writing //
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `Request Date: ${now}  |  Method: ${req.method}  |  URL: ${req.url}`;

  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) {
      console.log("Could not write to server log".red);
      console.log(`${err}`.red);
    }
  });

  console.log(log);
  next();
});

// maintenance page //
app.use((req, res, next) => {
  res.render("maintenance");
});

// set static directory //
app.use(express.static(__dirname + "/public"));



// HELPER FUNCTIONS ===============
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
    type: "Server Error",
    statusText: "Request Not Valid"
  });
});




// SERVER START ===============
app.listen(PORT, () => {
  console.log(`The server is taking requests on ${port}`.green);
});
