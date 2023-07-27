import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../lib/graphql/queries";

export default function useJobs(limit, offset) {
  const {loading, data} = useQuery(
    GET_JOBS,
    {
      variables: { limit, offset },
      fetchPolicy: 'network-only',
    }
    );

  return {
    loading, 
    jobs: data?.jobs.items, 
    totalCount: data?.jobs.totalCount || 0
  };
}