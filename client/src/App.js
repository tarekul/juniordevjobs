import React, { useState, useEffect } from "react";
import "./App.css";

import Jobs from "./Jobs";

const JOB_API_URL = "http://localhost:3001/jobs";

async function fetchJobs(updataCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  updataCb(json);

  console.log({ json });
}

function App() {
  const [joblist, updateJobs] = useState([]);

  useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  return (
    <div className="App">
      <Jobs jobs={joblist} />
    </div>
  );
}

export default App;
