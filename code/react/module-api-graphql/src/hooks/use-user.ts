import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { request, gql } from "graphql-request";

type Id = string;

type User = {
  id: Id;
  name: string;
};

const graphqlEndpoint = "https://api.example.com/graphql";

async function getAllUsers() {
  return request<User[]>(
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

  return request<User>(
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

async function addUser({ name }: Omit<User, "id">) {
  return request<{ user: User }>(
    graphqlEndpoint,
    gql`
      mutation AddUser($name: String!) {
        addUser(name: $name) {
          id
          name
        }
      }
    `,
    { name }
  );
}

async function updateUser({ id, name }: User) {
  return request<{ user: User }>(
    graphqlEndpoint,
    gql`
      mutation UpdateUser($id: Id!, $name: String!) {
        updateUser(id: $id, name: $name) {
          id
          name
        }
      }
    `,
    { id, name }
  );
}

async function removeUser(id: Id) {
  return request<{ user: User }>(
    graphqlEndpoint,
    gql`
      mutation RemoveUser($id: Id!) {
        removeUser(id: $id) {
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
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: getUser,
    enabled: !!id,
  });
}

export function useAddUser() {
  return useMutation({ mutationFn: addUser });
}

export function useUpdateUser() {
  return useMutation({ mutationFn: updateUser });
}

export function useRemoveUser() {
  return useMutation({ mutationFn: removeUser });
}
