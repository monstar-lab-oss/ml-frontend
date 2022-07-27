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
  const { isLoading, data, isFetched, isError } = useGetUserQuery({
    id: "1",
  });

  useEffect(() => {
    if (isFetched) reset(data);
  }, [isFetched]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: useMemo(() => data || {}, [data]),
  });

  const { mutateAsync } = useMutation(updateUser, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });

  const onSubmit = (data: User) => mutateAsync(data);

  if (isError) return <div>Failed to fetch</div>;

  return (
    <>
      <h2>Profile</h2>
      <p>{isLoading && "Loading..."}</p>

      <div style={{ width: 400 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            {isFetched && data ? (
              <img
                src={data.avatar}
                alt={`${data.first_name} ${data.last_name}`}
                width={data.avatar_size_width}
                height={data.avatar_size_height}
                style={{ backgroundColor: "#F6F8FA" }}
              />
            ) : null}
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              disabled={isSubmitting}
              {...register("email", { required: true })}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "10px",
              }}
            >
              <div>
                <label htmlFor="first_name">first name</label>
                <input
                  id="first_name"
                  disabled={isSubmitting}
                  {...register("first_name", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="last_name">last name</label>
                <input
                  id="last_name"
                  disabled={isSubmitting}
                  {...register("last_name", { required: true })}
                />
              </div>
            </div>
            <input
              type="submit"
              value={isSubmitting ? "Submitting..." : "Update"}
              disabled={isSubmitting}
            />
          </fieldset>
        </form>
      </div>
    </>
  );
};
export default Profile;
