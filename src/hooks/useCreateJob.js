import { useMutation } from "@apollo/client";
import { CREATE_JOB, GET_JOB } from "../lib/graphql/queries";

export default function useCreateJob() {
  const [mutate, { loading }] = useMutation(CREATE_JOB, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: GET_JOB,
        variables: { id: data.job.id },
        data,
      })
    }
  });

  return { 
    createJob: async (title, description) => {
      const input = {title, description};
      const { data } = await mutate({variables: { input }});
      return data.job;
    }, 
    loading 
  };
}