import { useGetUserQuery } from "../../user";

const ProfileScreen = () => {
  const { data, isLoading } = useGetUserQuery(1);

  return (
    <div>
      <div>ProfileScreen</div>
      <div>{isLoading && "Loading..."}</div>
      {!isLoading && !!data && (
        <div>
          <div>Name: {data.name}</div>
          <div>email: {data.email}</div>
          <div>
            <img src={data.avatar} alt="avatar" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
