import { createQuery } from "@tanstack/solid-query";
import { request, gql } from "graphql-request";

const graphqlEndpoint = "https://api.example.com/graphql";

export function useUser() {
  return createQuery(
    () => ["user"],
    () =>
      request<{ user: { id: string; name: string } }>(
        graphqlEndpoint,
        gql`
          query GetUser {
            name
          }
        `
      )
  );
}
