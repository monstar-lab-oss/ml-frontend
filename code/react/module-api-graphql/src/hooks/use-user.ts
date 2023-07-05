import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const graphqlEndpoint = "https://api.example.com/graphql";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      request<{ user: { id: string; name: string } }>(
        graphqlEndpoint,
        gql`
          query GetUser {
            name
          }
        `
      ),
  });
}
