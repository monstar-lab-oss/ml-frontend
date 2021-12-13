import { useCallback, useState } from "react";

import { useQueryClient } from "react-query";

import { useUserQuery, UserResponseData } from "@app/features/user/user";

import UserForm from "../../components/UserForm";

const ProfileScreen = () => {
  const queryClient = useQueryClient();

  const [isEditingUser, setIsEditingUser] = useState(false);

  // Use a flag named isEditingUser to prevent re-fetching user when editing user
  const { user, isLoading } = useUserQuery(1, !isEditingUser);

  const handleUserUpdated = useCallback(
    (updatedUser: UserResponseData) => {
      // Have to comment out the following line because reqres.in returns mock data after re-fetching user
      // setIsEditingUser(false);

      queryClient.setQueryData(`/users/${user?.id}`, {
        data: updatedUser,
      });
    },
    [queryClient, user]
  );

  return (
    <div>
      <div>ProfileScreen</div>
      <div>{isLoading && "Loading..."}</div>
      {!isLoading && !!user && (
        <div>
          <div>Name: {user.name}</div>
          <div>email: {user.email}</div>
          <div>
            <img src={user.avatar} alt="avatar" />
          </div>
          <button onClick={() => setIsEditingUser(true)}>Edit</button>
        </div>
      )}
      {isEditingUser && user && (
        <UserForm user={user} handleUserUpdated={handleUserUpdated} />
      )}
    </div>
  );
};

export default ProfileScreen;
