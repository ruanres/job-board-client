import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../lib/graphql/queries";

export default function useJobs() {
  const {loading, data} = useQuery(GET_JOBS, {fetchPolicy: 'network-only'});

  return {loading, jobs: data?.jobs};
}