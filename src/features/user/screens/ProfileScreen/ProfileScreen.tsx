import { useUserQuery } from "@app/features/user/user";

const ProfileScreen = () => {
  const { user, isLoading } = useUserQuery(1);

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
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
