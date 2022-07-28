import { Employee } from "@/types/employee";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  onCreate: (payload: Omit<Employee, "id">) => void;
  isSuccess: boolean;
};

export const EmployeeForm = ({ onCreate, isSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: { name: "" },
  });

  const onSubmit = (data: Omit<Employee, "id">) => {
    onCreate(data);
  };

  useEffect(() => {
    isSuccess && reset();
  }, [isSuccess]);

  return (
    <>
      <h3>Create Employee</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />

        {errors.name && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
};
