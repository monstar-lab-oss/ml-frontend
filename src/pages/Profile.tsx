import { useQuery } from "react-query";
import { http } from "@/utils/http";
import { User } from "@/types/user";

const useGetUserQuery = (id: number) =>
  useQuery("user", async () => await http.get<User>(`/user/${id}`));

export const Profile = () => {
  const { isLoading, data, isFetched } = useGetUserQuery(1);

  return (
    <div>
      <div>ProfileScreen</div>
      <div>{isLoading && "Loading..."}</div>
      {isFetched && data ? (
        <div>
          <div>
            Name: {data.first_name} {data.last_name}
          </div>
          <div>email: {data.email}</div>
          <div>
            <img src={data.avatar} alt="avatar" />
          </div>
        </div>
      ) : null}
    </div>
  );
};
