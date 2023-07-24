import { useQuery } from "@apollo/client";
import { GET_JOB } from "../lib/graphql/queries";

export default function useJob(id) {
  const {loading, data} = useQuery(GET_JOB, { variables: { id }});

  return {loading, job: data?.job};
}