import React from "react";
import JobModal from "./JobModal";
import { Typography, Paper } from "@material-ui/core";

export default function Job({ job }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Paper className="job" onClick={handleClickOpen}>
        <div>
          <Typography variant="h6">{job.title}</Typography>
          <Typography variant="h5">{job.company}</Typography>
          <Typography>{job.location}</Typography>
        </div>
        <div>
          <Typography>
            {job.created_at
              .split(" ")
              .slice(0, 3)
              .join(" ")}
          </Typography>
        </div>
      </Paper>
      <JobModal open={open} handleClose={handleClose} job={job} />
    </>
  );
}
