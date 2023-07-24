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

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    description
    date
    company {
      id
      name
    }
  }
`;

export const GET_JOBS = gql`
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

export const GET_JOB = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const GET_COMPANY = gql`
  query Company($id: ID!) {
    company(id: $id) {
      description
      id
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

export async function createJob(title, description) {
  const input = { title, description };
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${jobDetailFragment}
  `;
  const { data: { job }} = await apolloClient.mutate({ 
    mutation, 
    variables: {input},
    update: (cache, { data }) => {
      cache.writeQuery({
        query: GET_JOB,
        variables: { id: data.job.id },
        data,
      })
    }
  });
  return job;
}