import { useQuery, QueryCache } from "react-query";
import { http } from "@/utils/http";
import { User } from "@/types/user";

const useGetUserQuery = ({ id }: { id: string }) =>
  useQuery("user", async () => await http.get<User>(`/user/${id}`));

export const Profile = () => {
  const { isLoading, data, isFetched, isError } = useGetUserQuery({ id: "1" });

  return (
    <div>
      <div>ProfileScreen</div>
      <div>{isLoading && "Loading..."}</div>
      <div>{isError && "Failed to fetch"}</div>
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
