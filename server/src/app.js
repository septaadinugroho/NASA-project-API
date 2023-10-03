const path = require("path");
const morgan = require("morgan");
const express = require("express"); //import express
const cors = require("cors"); //memberi izin antar origin

const planetsRouter = require("./routes/planets/planets.router"); //import router planet
const launchesRouter = require("./routes/launches/launches.router"); //import router launch

const app = express(); //inisialisasi function express

app.use(
  cors({
    origin: "http://localhost:3000", //mengizinkan akses dari port 3000 (frontend side)
  })
);

app.use(morgan("combined"));

app.use(express.json()); //inisialisasi supaya content-typenya json
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets",planetsRouter); //menjalankan function router
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//export inisialisasinya
module.exports = app;
