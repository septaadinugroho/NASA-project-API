const fs = require("fs"); //stream buat baca/tulis data
const path = require("path");
const { parse } = require("csv-parse"); //import csv parse supaya data bisa dibaca

const habitablePlanets = []; //array buat nampung data planet sementara

//function buat memunculkan planet yang sesuai kriteria
function isHabitablePlanet(planet) {
  return planet["koi_disposition"] === "CONFIRMED" && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11 && planet["koi_prad"] < 1.6;
}

//loadPlanetsData memastikan bahwa data masuk ke array dulu baru ditampilkan ke frontend
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data); //kalo planetnya sesuai kriteria, maka masuk ke array
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(` ${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

//export function yang ada
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
