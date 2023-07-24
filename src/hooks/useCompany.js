import { useQuery } from "@apollo/client";
import { GET_COMPANY } from "../lib/graphql/queries";

export default function useCompany(id) {
  const {loading, data} = useQuery(GET_COMPANY, { variables: { id }});

  return {loading, company: data?.company};
}