import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

type Id = string;

type User = {
  id: Id;
  name: string;
};

const graphqlEndpoint = "https://api.example.com/graphql";

async function getAllUsers() {
  return request<{ user: User[] }>(
    graphqlEndpoint,
    gql`
      query GetUserList {
        users {
          id
          name
        }
      }
    `
  );
}

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: getAllUsers });
}
