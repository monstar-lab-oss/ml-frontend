import { useCallback } from "react";

import { useForm } from "react-hook-form";

import { ApiMethods } from "@app/constants/api.constants";
import { User, UserResponseData } from "@app/features/user/user";
import useMutation from "@app/hooks/useMutation";

export type UserFormProps = {
  user: UserResponseData;
  handleUserUpdated: (updatedUser: UserResponseData) => void;
};

const UserForm: React.FC<UserFormProps> = ({ user, handleUserUpdated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const { mutateAsync: updateUser, isLoading } = useMutation<
    UserResponseData,
    User
  >(`users/${user.id}`, ApiMethods.PUT);

  const handleUpdate = useCallback(
    async editingUser => {
      // Have to comment out the following line because reqres.in returns mock data after updating user
      // const updatedUser = await updateUser(editingUser);
      await updateUser(editingUser);

      handleUserUpdated(editingUser);
    },
    [updateUser, handleUserUpdated]
  );

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <input {...register("first_name", { required: true })} />
      {errors.first_name && <span>This field is required</span>}
      <br />
      <input {...register("last_name", { required: true })} />
      {errors.last_name && <span>This field is required</span>}
      <br />
      <input {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <br />
      <button disabled={isLoading}>{isLoading ? "Updating" : "Update"}</button>
    </form>
  );
};

export default UserForm;
