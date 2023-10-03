const { getAllPlanets } = require("../../models/planets.model"); //import module planets.model

//dapetin isi planetnya
function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets());
}

//export functionnya
module.exports = {
  httpGetAllPlanets,
};
