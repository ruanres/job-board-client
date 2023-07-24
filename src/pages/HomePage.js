import JobList from '../components/JobList';
import useJobs from '../hooks/useJobs';

function HomePage() {
  const { loading, jobs } = useJobs();

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      {loading ? <h1>Loading...</h1> : <JobList jobs={jobs} />}
    </div>
  );
}

export default HomePage;
