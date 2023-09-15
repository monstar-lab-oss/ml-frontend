import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
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

type GetUserQueryContext = QueryFunctionContext<["user", { id?: Id }]>;
async function getUser({ queryKey }: GetUserQueryContext) {
  const [, { id }] = queryKey;

  return request<{ user: User }>(
    graphqlEndpoint,
    gql`
      query GetUser($id: Id) {
        user(id: $id) {
          id
          name
        }
      }
    `,
    { id }
  );
}

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: getAllUsers });
}

export function useUser(id?: Id) {
  return useQuery({ queryKey: ["user", { id }], queryFn: getUser });
}
