import {
  ApolloClient,
  defaultDataIdFromObject,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client/link/http";
import supabase, { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase";

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    if ("nodeId" in responseObject) {
      return `${responseObject.nodeId}`;
    }

    return defaultDataIdFromObject(responseObject);
  },
});

const httpLink = new HttpLink({
  uri: `${SUPABASE_URL}/graphql/v1`,
});

const authLink = new SetContextLink(async ({ headers }) => {
  const token = (await supabase.auth.getSession()).data.session?.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      apikey: SUPABASE_ANON_KEY,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default apolloClient;
