var CronJob = require("cron").CronJob;
const fetchGithub = require("./tasks/fetch-github");
var job = new CronJob(
  "* * * * * ",
  fetchGithub,
  null,
  true,
  "America/New_York"
);
job.start();
