import React from "react";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";
import Job from "./Job";

export default function Jobs({ jobs }) {
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs / 50);

  const [activeStep, setActiveStep] = React.useState(0);
  const [search, setsearch] = React.useState("");
  const [jobsOnPage, setjobsOnPage] = React.useState(jobs);
  const handleChange = e => {
    if (e.target.value === "") setjobsOnPage(jobs);
    setsearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

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

  jobsOnPage.slice(activeStep * 50, activeStep * 50 + 50);

  return (
    <div className={"jobs"}>
      <Typography variant="h4" component="h1">
        Entry Level Software Jobs
      </Typography>
      <Typography variant="h6" component="h1">
        Found {numJobs} Jobs
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Search..."
          value={search}
          onChange={e => handleChange(e)}
        />
      </form>

      {jobsOnPage.length > 0
        ? jobsOnPage.map((job, index) => <Job key={index} job={job} />)
        : jobs.map((job, index) => <Job key={index} job={job} />)}
      <div>
        Page {activeStep + 1} of {numPages}
      </div>
      <MobileStepper
        variant="progress"
        steps={numPages}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === numPages - 1}
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
