import { useCallback, useState } from "react";

import { useQueryClient } from "react-query";

import { ApiMethods } from "@app/constants/api.constants";
import { UserResponseData } from "@app/features/user/user";
import useMutation from "@app/hooks/useMutation";
import useQuery from "@app/hooks/useQuery";
import { PaginationResponse } from "@app/types/api.types";

import UserForm from "../../components/UserForm";

const UserListScreen = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<UserResponseData | null>(null);

  const url = `users?page=${page}`;

  const { isLoading, data, isFetching } =
    useQuery<PaginationResponse<UserResponseData[]>>(url);

  const handleNext = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const handlePrev = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  const handleEdit = useCallback(
    (user: UserResponseData) => {
      setEditingUser(user);
    },
    [setEditingUser]
  );

  const { isLoading: isDeleting, mutateAsync: deleteUser } = useMutation<
    unknown,
    { ":id": number }
  >(`users/:id`, ApiMethods.DELETE);

  const handleDeleting = useCallback(
    async (deletingUser: UserResponseData) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Do you want to delete: ${deletingUser.first_name}`)) {
        await deleteUser({
          ":id": deletingUser.id,
        });

        queryClient.setQueryData(
          url,
          // eslint-disable-next-line
          (
            listData: PaginationResponse<UserResponseData[]> | undefined
          ): PaginationResponse<UserResponseData[]> => {
            if (listData && Array.isArray(listData?.data)) {
              listData.data = listData.data.filter(
                user => user.id !== deletingUser.id
              );
            }

            return listData as PaginationResponse<UserResponseData[]>;
          }
        );

        setEditingUser(null);
      }
    },
    [deleteUser, setEditingUser, queryClient, url]
  );

  const handleUserUpdated = useCallback(
    (updatedUser: UserResponseData) => {
      queryClient.setQueryData(
        url,
        // eslint-disable-next-line
        (
          listData: PaginationResponse<UserResponseData[]> | undefined
        ): PaginationResponse<UserResponseData[]> => {
          if (listData && Array.isArray(listData?.data)) {
            listData.data = listData.data.map(user => {
              if (user.id === updatedUser.id) {
                return updatedUser;
              }

              return user;
            });
          }

          return listData as PaginationResponse<UserResponseData[]>;
        }
      );

      setEditingUser(null);
    },
    [queryClient, url, setEditingUser]
  );

  return (
    <div>
      <div>User List</div>
      <div>{isLoading && "Loading..."}</div>
      {!isLoading && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button
                      onClick={() => handleDeleting(user)}
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 10 }}>Total pages: {data?.total_pages}</div>
          <div style={{ marginTop: 10 }}>
            <button
              onClick={handlePrev}
              disabled={isLoading || isFetching || page <= 1}
            >
              Prev
            </button>
            &nbsp;&nbsp;{data?.page}&nbsp;&nbsp;
            <button
              onClick={handleNext}
              disabled={
                isLoading || isFetching || page >= (data?.total_pages ?? 0)
              }
            >
              Next
            </button>
          </div>
          {editingUser && (
            <div style={{ marginTop: 10 }}>
              <UserForm
                user={editingUser}
                handleUserUpdated={handleUserUpdated}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserListScreen;
