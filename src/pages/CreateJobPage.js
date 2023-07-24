import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useCreateJob from '../hooks/useCreateJob';

function CreateJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createJob, job } = useCreateJob();
  const navigate = useNavigate();

  useEffect(() => {
    if(job) {
      navigate(`/jobs/${job.id}`);
    }
  }, [navigate, job]);

  const clearForm = () => {
    setTitle('');
    setDescription('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    createJob(title, description);
    clearForm();
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
