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
        jobs {
          id
          title
          description
          date
        }
      }
    }
  `;
    const { company } = await client.request(query);
    return company;
}

export async function createJob(title, description) {
  const input = { title, description };
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
        date
        description
        title
        company {
          id
          name
        }
      }
    }
  `;
      const { job } = await client.request(mutation, { input });
      return job;
}