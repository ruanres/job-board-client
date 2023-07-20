import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {getAccessToken} from '../auth';

const GRAPHQL_SERVER_URL = 'http://localhost:9000/graphql';

const httpLink = createHttpLink({
  uri: GRAPHQL_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
  const { data: { jobs }} = await apolloClient.query({
    query,
    fetchPolicy: 'network-only',
  });
  return jobs;
}

const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      id
      title
      description
      date
      company {
        id
        name
      }
    }
  }
`;

export async function getJob(id) {
  const query = jobByIdQuery;
  const { data: { job }} = await apolloClient.query({
    query,
    variables: { id }
  });
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
  const { data: { company }} = await apolloClient.query({query});
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
  const { data: { job }} = await apolloClient.mutate({ 
    mutation, 
    variables: {input},
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobByIdQuery,
        variables: { id: data.job.id },
        data,
      })
    }
  });
  return job;
}