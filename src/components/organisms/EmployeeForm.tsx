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

  const onSubmit = async (data: Omit<Employee, "id">) => {
    try {
      values ? await onUpdate({ id: values.id, ...data }) : await onCreate(data);
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    values?.name && setValue("name", values.name);
  }, [values]);

  useEffect(() => {
    isSuccess && reset();
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} data-testid="input-name" />

        {errors.name && <span>This field is required</span>}

        <input type="submit" data-testid="button-update" />
      </form>
    </>
  );
};
