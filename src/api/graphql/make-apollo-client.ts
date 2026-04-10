import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { fetchAuthSession } from "aws-amplify/auth";
import { RestLink } from "apollo-link-rest";

const authMiddleware = setContext(async (_, { headers }) => {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch {
    return { headers };
  }
});


const restLink = new RestLink({ uri: import.meta.env.VITE_GOOGLE_BOOKS_API_URL });


const graphQLLink  = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

export const link = authMiddleware.concat(graphQLLink);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([restLink, link]),
});