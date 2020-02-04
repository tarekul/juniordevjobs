const fetch = require("node-fetch");
var redis = require("redis"),
  client = redis.createClient();

const { promisify } = require("util");

const setAsync = promisify(client.set).bind(client);

const baseURL = "https://jobs.github.com/positions.json";

async function fetchGithub() {
  let resultCount = 1;
  let onPage = 0;
  const allJobs = [];
  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?location=united_states&page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log("got", jobs.length, "jobs");
    onPage++;
  }

  console.log("got", allJobs.length, "total jobs");

  //filter algo
  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();

    //algo logic
    if (
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("sr") ||
      jobTitle.includes("architect")
    )
      return false;
    else if (
      job.description.includes("3-5") ||
      job.description.includes("4-5") ||
      job.description.includes("5+") ||
      job.description.includes("4+") ||
      job.description.includes("8-12")
    )
      return false;
    return true;
  });

  console.log("filtered down to ", jrJobs.length);
  jrJobs.sort((a, b) => {
    const a_time = new Date(a.created_at);
    const b_time = new Date(b.created_at);

    return b_time - a_time;
  });

  //set in redis
  const success = await setAsync("github", JSON.stringify(jrJobs));

  console.log({ success });
}

//fetchGithub();

module.exports = fetchGithub;
