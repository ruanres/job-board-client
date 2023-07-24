import { useParams } from 'react-router';
import { GET_COMPANY } from '../lib/graphql/queries';
import JobList from '../components/JobList';
import { useQuery } from '@apollo/client';

function CompanyPage() {
  const { companyId } = useParams();
  const { data, loading } = useQuery(GET_COMPANY, { variables: { companyId }});

  if(loading) return <>Loading...</>;

  return (
    <div>
      <h1 className="title">
        {data.company.name}
      </h1>
      <div className="box">
        {data.company.description}
      </div>
      <h2 className='title is-5'>Jobs at {data.company.name}</h2>
      <JobList jobs={data.company.jobs} />
    </div>
  );
}

export default CompanyPage;
