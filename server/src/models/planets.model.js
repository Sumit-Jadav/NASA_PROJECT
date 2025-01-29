import fs from "fs";
import { parse } from "csv-parse";
import path from "path";

const habitablePlanets = [];

function isHabitable(planet) {
  if (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  ) {
    return planet;
  }
}

//! createReadStream will create readstream and node will execurte  it asynchronously so when it is executing node will execute export statement and wrong data fill be exported. To solve this promises is used and when that promises is resolved then next statement is exexuted. In server before listening to the server we will execute this promise so that our app can send proper data

function loadPlanets() {
  new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(import.meta.dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (chunk) => {
        if (isHabitable(chunk)) {
          habitablePlanets.push(chunk);
        }
      })
      .on("error", (err) => {
        console.log(`Error :- ${err.message}`);
        reject(err); //! reject promise when some error occure
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} planets found`);
        resolve(); //! resolve promise when data is completely loaded.
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

export { loadPlanets, getAllPlanets };
// export { loadPlanets, habitablePlanets as planets };
