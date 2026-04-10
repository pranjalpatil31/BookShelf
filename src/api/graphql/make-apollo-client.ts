import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { fetchAuthSession } from "aws-amplify/auth";

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

// ✅ GraphQL ONLY (Apollo best practice)
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

// Combine auth + graphql
export const client = new ApolloClient({
  link: from([authMiddleware.concat(httpLink)]),
  cache: new InMemoryCache(),
});
