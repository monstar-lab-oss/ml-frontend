import useMutation from "@app/hooks/useMutation";
import useQuery from "@app/hooks/useQuery";

const HomeScreen = () => {
  const { data } =
    // eslint-disable-next-line camelcase
    useQuery<{ data: { id: string; first_name: string; last_name: string }[] }>(
      "users"
    );

  const { data: createdUser, mutateAsync: createUser } = useMutation("users");

  console.log(data);
  console.log(createdUser);

  return (
    <div>
      <button onClick={() => createUser()}>Create User</button>
    </div>
  );
};

export default HomeScreen;
