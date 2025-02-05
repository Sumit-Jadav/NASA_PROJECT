import {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortById,
} from "../../models/launches.model.js";

export function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

export function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.target ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Missing required field!!!",
    });
  }
  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunch(launch);

  return res.status(201).json(launch);
}

export function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!existLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = abortById(launchId);
  return res.status(200).json(aborted);
}
