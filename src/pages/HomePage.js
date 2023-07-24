import JobList from '../components/JobList';
import { GET_JOBS } from '../lib/graphql/queries';
import { useQuery } from '@apollo/client';

function HomePage() {
  const {loading, data} = useQuery(GET_JOBS, {fetchPolicy: 'network-only'});

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      {loading ? <h1>Loading...</h1> : <JobList jobs={data.jobs} />}
    </div>
  );
}

export default HomePage;
