import { useMemo, useState } from "react";
import { http } from "@/utils/http";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { Employee as Payload } from "@/types/employee";

// TODO: not yet implemented
const useGetEmployeeQuery = ({ id }: { id: string }) =>
  useQuery("user", async () => await http.get<Payload>(`/employee/${id}`));

const useGetEmployeeListQuery = () =>
  useQuery("userList", async () => await http.get<Payload[]>("/employee"));

const createEmployee = async (payload: Payload) => {
  const response = await http.post<{ message: string }>("/employee", payload);
  return response;
};

// TODO: not yet implemented
const updateEmployee = async (id: string, payload: Payload) => {
  const response = await http.put<{ message: string }>(
    `/employee/${id}`,
    payload
  );
  return response;
};

// TODO: not yet implemented
const removeEmployee = async (id: string) => {
  const response = await http.delete<{ message: string }>(`/employee/${id}`);
  return response;
};

// components
type EmployeeFormProps = {
  values?: Payload;
  onSubmit: (payload: Payload) => void;
  onCancel: () => void;
};
const EmployeeForm = ({ values, onSubmit, onCancel }: EmployeeFormProps) => {
  const { register, handleSubmit } = useForm<Payload>({
    mode: "onChange",
    defaultValues: useMemo(() => values || {}, [values]),
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="id" {...register("id")} />
        <input placeholder="name" {...register("name")} />
        <input type="submit" value="Submit" />
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};

type EmployeeListProps = {
  data: Payload[];
};
const EmployeeList = ({ data }: EmployeeListProps) => (
  <ul>
    {data.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

const Employee = () => {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const { isLoading, data, isFetched, isError } = useGetEmployeeListQuery();

  const { mutate } = useMutation(createEmployee, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });

  const onSubmit = (data: Payload) => {
    mutate(data);
  };
  return (
    <div>
      <div>EmployeeScreen</div>
      {!isVisibleForm && (
        <button onClick={() => setIsVisibleForm(true)}>
          Create new employee
        </button>
      )}
      <div>{isLoading && "Loading..."}</div>
      <div>{isError && "Failed to fetch"}</div>
      {isFetched && data ? <EmployeeList data={data} /> : null}
      {isVisibleForm && (
        <>
          <div>EmployeeForm</div>
          <EmployeeForm
            onSubmit={onSubmit}
            onCancel={() => setIsVisibleForm(false)}
          />
        </>
      )}
    </div>
  );
};

export default Employee;
