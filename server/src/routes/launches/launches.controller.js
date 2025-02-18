import {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortById,
} from "../../models/launches.model.js";

export async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

export async function httpAddNewLaunch(req, res) {
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
  await addNewLaunch(launch);

  return res.status(201).json(launch);
}

export async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existLaunch = await existLaunchWithId(launchId);
  if (!existLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = await abortById(launchId);

  if (!aborted) {
    return res.status(400).json({
      error: "Launch not Aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}
