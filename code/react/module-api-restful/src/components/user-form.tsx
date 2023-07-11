import { useState } from "react";
import {
  useUser,
  useAddUser,
  useRemoveUser,
  useUpdateUser,
} from "../hooks/use-user";

type Props = {
  id?: string;
};

export function UserForm({ id }: Props) {
  const isUpdate = !!id;

  const { data, isLoading } = useUser(id);
  const { mutate: addMutate } = useAddUser();
  const { mutate: updateMutate } = useUpdateUser();
  const { mutate: removeMutate } = useRemoveUser();

  const [user, setUser] = useState({ name: data?.name || "" });

  const onAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMutate({ name: user.name });
  };

  const onUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    id && updateMutate({ id, name: user.name });
  };

  const onRemoveClick = async () => {
    id && removeMutate(id);
  };

  if (id && isLoading) return <span aria-label="loading">Loading...</span>;

  return (
    <>
      <form onSubmit={isUpdate ? onUpdateSubmit : onAddSubmit}>
        <input
          value={user.name}
          onChange={(e) => setUser({ name: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>

      {id && (
        <button type="button" onClick={onRemoveClick}>
          Remove
        </button>
      )}
    </>
  );
}
