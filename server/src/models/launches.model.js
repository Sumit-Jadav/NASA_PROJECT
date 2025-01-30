let newFlightNumber = 100;

const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27 , 2030"),
  target: "Kepler-442 b",
  customer: ["ISRO", "NASA"],
  upcomming: true,
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
      upcomming: true,
      customer: ["ZTM", "NASA"],
      flightNumber: newFlightNumber,
    })
  );
}
export { getAllLaunches, addNewLaunch };
