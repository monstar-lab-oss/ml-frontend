import { Employee } from "@/types/employee";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props =
  | {
      values: Employee;
      onUpdate: (payload: Employee) => void;
      onCreate?: never;
      isSuccess?: never;
    }
  | {
      values?: undefined;
      onUpdate?: never;
      onCreate: (payload: Omit<Employee, "id">) => void;
      isSuccess: boolean;
    };

export const EmployeeForm = ({
  values,
  onUpdate,
  onCreate,
  isSuccess,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: values ?? { name: "" },
  });

  const onSubmit = (data: Omit<Employee, "id">) => {
    values ? onUpdate({ id: values.id, ...data }) : onCreate(data);
  };

  useEffect(() => {
    values?.name && setValue("name", values.name);
  }, [values]);

  useEffect(() => {
    isSuccess && reset();
  }, [isSuccess]);

  return (
    <>
      <h3>{values ? `Update ${values.name}` : "Create Employee"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />

        {errors.name && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
};
