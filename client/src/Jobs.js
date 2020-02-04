import React from "react";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";
import Job from "./Job";

import manImage from "./man.png";

export default function Jobs({ jobs }) {
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs / 50);

  const [activeStep, setActiveStep] = React.useState(0);
  const [search, setsearch] = React.useState("");
  const [jobsOnPage, setjobsOnPage] = React.useState(jobs);
  const numJobs2 = jobsOnPage.length;
  const numPages2 = Math.ceil(numJobs2 / 50);
  const handleChange = e => {
    if (e.target.value === "") setjobsOnPage(jobs);
    setsearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setActiveStep(0);
    const filtered_loc = jobs.filter(job =>
      job.location.toLowerCase().startsWith(search.toLowerCase())
    );
    setjobsOnPage(filtered_loc);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className="jobs" style={{ position: "relative" }}>
      <Typography variant="h4" component="h1" className="heading">
        Entry Level Software Jobs
      </Typography>
      <Typography variant="h6" component="h1" className="heading">
        Found {jobsOnPage.length > 0 ? numJobs2 : numJobs} Jobs
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <TextField
          id="standard-basic"
          label="Search..."
          value={search}
          onChange={e => handleChange(e)}
          variant="filled"
          style={{ backgroundColor: "grey" }}
        />
      </form>

      <img src={manImage} className="image" />

      {jobsOnPage.length > 0
        ? jobsOnPage
            .slice(activeStep * 50, activeStep * 50 + 50)
            .map((job, index) => <Job key={index} job={job} />)
        : jobs
            .slice(activeStep * 50, activeStep * 50 + 50)
            .map((job, index) => <Job key={index} job={job} />)}
      <div style={{ color: "white" }}>
        Page {activeStep + 1} of {jobsOnPage.length > 0 ? numPages2 : numPages}
      </div>
      <MobileStepper
        variant="progress"
        steps={jobsOnPage.length > 0 ? numPages2 : numPages}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={
              jobsOnPage.length > 0
                ? activeStep === numPages2 - 1
                : activeStep === numPages - 1
            }
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft /> Back
          </Button>
        }
      />
    </div>
  );
}
