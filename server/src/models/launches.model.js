import launchesDatabase from "./launches.mongo.js";
import planets from "./planets.mongo.js";
// const launches = new Map();

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27 , 2030"),
  target: "Kepler-442 b",
  customers: ["ISRO", "NASA"],
  upcoming: true,
  sucess: true,
};

saveLaunch(launch);
// launches.set(launch.flightNumber, launch);

async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launchesDatabase.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    kepler_name: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

//* NOTE:- -flightNumber in short method will sort launches in decending order so we will get latest launch

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function addNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    sucess: true,
    customers: ["NASA", "ZTM", "ISRO"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

// function addNewLaunch(launch) {
//   newFlightNumber++;
//   launches.set(
//     newFlightNumber,
//     Object.assign(launch, {
//       sucess: true,
//       upcoming: true,
//       customers: ["ZTM", "NASA", "ISRO"],
//       flightNumber: newFlightNumber,
//     })
//   );
// }

async function existLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function abortById(launchId) {
  // const aborted = launches.get(launchId);
  // aborted.upcoming = false;
  // aborted.sucess = false;
  // return aborted;
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      sucess: false,
    }
  );
  return aborted.ok === 1 && aborted.nModified === 1;
}
export { getAllLaunches, addNewLaunch, existLaunchWithId, abortById };
