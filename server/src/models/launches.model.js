let newFlightNumber = 100;

const launches = new Map();

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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  newFlightNumber++;
  launches.set(
    newFlightNumber,
    Object.assign(launch, {
      sucess: true,
      upcoming: true,
      customers: ["ZTM", "NASA", "ISRO"],
      flightNumber: newFlightNumber,
    })
  );
}

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.sucess = false;
  return aborted;
}
export { getAllLaunches, addNewLaunch, existLaunchWithId, abortById };
