import { even } from "check-types";
import {useState} from "react";

const NewJobForm = props => {
  const [job, setJob] = useState(props.initialFormState)

  const handleInputChange = e => {
    const { name, value } = e.target;
    setJob({...job, [name]: value});
  }

  return (
    <form onSubmit={event => {
      event.preventDefault();
      if (!job.company || !job.position || !job.description) return;

      // Add job
      props.addJob(job);

      // Reset form
      setJob(props.initialFormState);
    }}>

      <label>Company</label>
      <input type="text" name="company" value={job.company} onChange={handleInputChange} />

      <label>Position</label>
      <input type="text" name="position" value={job.position} onChange={handleInputChange} ></input>

      <label>Description</label>
      <input type="text" name="description" value={job.description} onChange={handleInputChange} ></input>

      <input type="submit" value="Create" />
    </form>
  );
}

export default NewJobForm;