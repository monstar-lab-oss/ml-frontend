import { useEffect, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { http } from "@/utils/http";
import { User } from "@/types/user";

const useGetUserQuery = ({ id }: { id: string }) =>
  useQuery("user", async () => await http.get<User>(`/user/${id}`));

const updateUser = async (payload: User) => {
  const response = await http.post<{ message: string }>(`/user/1`, payload);
  return response;
};

const Profile = () => {
  const { isLoading, data, isFetched, isError } = useGetUserQuery({ id: "1" });

  useEffect(() => {
    if (isFetched) reset(data);
  }, [isFetched]);

  const { register, handleSubmit, reset } = useForm<User>({
    mode: "onChange",
    defaultValues: useMemo(() => data || {}, [data]),
  });

  const { mutate } = useMutation(updateUser, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });

  const onSubmit = (data: User) => mutate(data);

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
            <img
              src={data.avatar}
              alt={`${data.first_name} ${data.last_name}`}
              width={data.avatar_size_width}
              height={data.avatar_size_height}
              style={{ backgroundColor: "#eee" }}
            />
          </div>
        </div>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        <input type="submit" value="Update Email" />
      </form>
    </div>
  );
};
export default Profile;
