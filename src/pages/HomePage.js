import { useState } from 'react';
import JobList from '../components/JobList';
import useJobs from '../hooks/useJobs';
import PaginationBar from '../components/PaginationBar';

const JOBS_PER_PAGE = 5;
function HomePage() {
  const [page, setPage] = useState(1)
  const { loading, jobs, totalCount } = useJobs(JOBS_PER_PAGE, (page - 1) * JOBS_PER_PAGE);
  const totalPages = Math.ceil(totalCount / JOBS_PER_PAGE);

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <PaginationBar 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage}
      />
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
