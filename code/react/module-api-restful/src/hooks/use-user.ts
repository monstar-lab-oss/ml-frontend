import { useQuery, useMutation } from "@tanstack/react-query";

type Id = string;

type User = {
  id: Id;
  name: string;
};

const endpoint = "https://api.example.com";

async function getAllUsers() {
  const res = await fetch(`${endpoint}/users`);

  return (await res.json()) as User[];
}

async function getUser(id?: Id) {
  // Type guard: Return early if `id` is missing or falsy
  if (!id) return;

  const res = await fetch(`${endpoint}/user/${id}`);

  return (await res.json()) as User;
}

async function addUser(user: Omit<User, "id">) {
  const res = await fetch(`${endpoint}/user`, {
    method: "POST",
    body: JSON.stringify(user),
  });

  return (await res.json()) as User;
}

async function updateUser({ id, name }: User) {
  const res = await fetch(`${endpoint}/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });

  return (await res.json()) as User;
}

async function removeUser(id: Id) {
  const res = await fetch(`${endpoint}/user/${id}`, {
    method: "DELETE",
  });

  return res.ok;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}

export function useUser(id?: Id) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}

export function useAddUser() {
  return useMutation({
    mutationFn: (user: Omit<User, "id">) => addUser(user),
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: (user: User) => updateUser(user),
  });
}

export function useRemoveUser() {
  return useMutation({ mutationFn: (id: Id) => removeUser(id) });
}
