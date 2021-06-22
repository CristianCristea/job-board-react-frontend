import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewJobForm from './NewJobForm';
import Job from './Job';
import EditJobForm from './EditJobForm';

const JobsList = (props) => {
  const initialFormState = {
    company: '',
    position: '',
    description: '',
  };

  useEffect(() => {
    axios.get('/api/v1/jobs.json').then((res) => setJobs(res.data));
  }, []);

  const [jobs, setJobs] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState(initialFormState);

  const addJob = (job) => {
    // https://www.npmjs.com/package/qs
    const qs = require('qs');

    axios
      .post(
        'api/v1/jobs',
        qs.stringify({
          job: {
            company: job.company,
            position: job.position,
            description: job.description,
          },
        })
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    setJobs([...jobs, job]);
  };

  const removeJob = (id) => {
    axios
      .delete(`api/v1/jobs/${id}`)
      .then((response) => {
        setJobs(jobs.filter((job) => job.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const editJob = (job) => {
    setEditing(true);
    setCurrentJob({
      id: job.id,
      position: job.position,
      company: job.company,
      description: job.description,
    });
  };

  const updateJob = (updatedJob) => {
    setEditing(false);
    const qs = require('qs');
    axios
      .patch(
        `/api/v1/jobs/${updatedJob.id}`,
        qs.stringify({
          job: {
            company: updatedJob.company,
            position: updatedJob.position,
            description: updatedJob.description,
          },
        })
      )
      .then((response) => console.log(response.data));

    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
  };

  console.log(jobs);
  return (
    <div>
      <div className='jobs-list'>
        <div>
          {editing ? (
            <EditJobForm
              setEditing={setEditing}
              currentJob={currentJob}
              updateJob={updateJob}
            />
          ) : (
            <NewJobForm addJob={addJob} initialFormState={initialFormState} />
          )}
        </div>
        {jobs.map((job, index) => (
          <Job
            job={job}
            key={job.id}
            removeJob={removeJob}
            editJob={editJob}
            editing={editing}
          />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
