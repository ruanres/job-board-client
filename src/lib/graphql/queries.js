import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient('http://localhost:9000/graphql');

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        company {
          id
          name
        }
        title
        id
        date
      }
    }
  `;
  const { jobs } = await client.request(query);
  return jobs;
}