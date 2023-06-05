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

export async function getJob(id) {
  const query = gql`
    query {
      job(id: "${id}") {
        title
        id
        date
        description
        company {
          id
          name
        }
      }
    }
  `;
    const { job } = await client.request(query);
    return job;
}

export async function getCompany(id) {
  const query = gql`
    query {
      company(id: "${id}") {
        description
        name
      }
    }
  `;
    const { company } = await client.request(query);
    return company;
}