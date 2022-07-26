import { useEffect, useState } from "react";
import { http } from "@/utils/http";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { Employee as Payload } from "@/types/employee";

// TODO: not yet implemented
const useGetEmployeeQuery = ({ id }: { id?: string }) =>
  id
    ? useQuery("user", async () => await http.get<Payload>(`/employee/${id}`))
    : null;

const useGetEmployeeListQuery = () =>
  useQuery("userList", async () => await http.get<Payload[]>("/employee"));

const createEmployee = async (payload: Omit<Payload, "id">) => {
  const response = await http.post<{ message: string }>("/employee", payload);
  return response;
};

const updateEmployee = async (payload: Payload) => {
  const { id, ...body } = payload;
  const response = await http.put<{ message: string }>(`/employee/${id}`, body);
  return response;
};

const removeEmployee = async (id: Payload["id"]) => {
  const response = await http.delete<{ message: string }>(`/employee/${id}`);
  return response;
};

// components
type EmployeeFormProps = {
  values: Payload | null;
  onCreate: (payload: Omit<Payload, "id">) => void;
  onUpdate: (payload: Payload) => void;
  onCancel: () => void;
};
const EmployeeForm = ({
  values: _values,
  onCreate,
  onUpdate,
  onCancel,
}: EmployeeFormProps) => {
  const { data: values } = useGetEmployeeQuery({
    id: _values?.id,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: values ?? { name: "" },
  });

  const onSubmit = (data: Omit<Payload, "id">) => {
    const isUpdate = _values?.id;

    isUpdate ? onUpdate({ id: _values.id, ...data }) : onCreate(data);
    reset({ name: "" });
  };

  useEffect(() => {
    if (!values?.name) return;

    setValue("name", values.name);
  }, [values]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />

        {errors.name && <span>This field is required</span>}

        <input type="submit" />
        <button
          type="button"
          onClick={() => {
            reset();
            onCancel();
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

type EmployeeListProps = {
  data: Payload[];
  onSelectClick: (arg0: Payload) => void;
  onRemoveClick: (id: string) => void;
};
const EmployeeList = ({
  data,
  onSelectClick,
  onRemoveClick,
}: EmployeeListProps) => {
  return (
    <ul>
      {data.map(({ id, name }) => (
        <li key={id}>
          <span>{id}</span>
          <button onClick={() => onSelectClick({ id, name })}>{name}</button>
          <button onClick={() => onRemoveClick(id)}>remove</button>
        </li>
      ))}
    </ul>
  );
};

const Employee = () => {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Payload | null>(null);

  const { isLoading, data, isFetched, isError } = useGetEmployeeListQuery();

  const { mutate: createMutate } = useMutation(createEmployee, {
    onSuccess: ({ message }) => {
      alert(message);
      setSelectedValues(null);
      setIsVisibleForm(false);
    },
    onError: (error) => alert(error),
  });

  const { mutate: updateMutate } = useMutation(updateEmployee, {
    onSuccess: ({ message }) => {
      alert(message);
      setSelectedValues(null);
      setIsVisibleForm(false);
    },
    onError: (error) => alert(error),
  });

  const { mutate: removeMutate } = useMutation(removeEmployee, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });

  return (
    <div>
      <div>EmployeeScreen</div>

      <div>{isLoading && "Loading..."}</div>
      <div>{isError && "Failed to fetch"}</div>
      <div>
        {isFetched && data?.length ? (
          <EmployeeList
            data={data}
            onSelectClick={(v: Payload) => setSelectedValues(v)}
            onRemoveClick={removeMutate}
          />
        ) : (
          "No Employee Found"
        )}
      </div>

      <button onClick={() => setIsVisibleForm(true)}>Create</button>

      <div>
        {(isVisibleForm || selectedValues) && (
          <EmployeeForm
            values={selectedValues}
            onCreate={createMutate}
            onUpdate={updateMutate}
            onCancel={() => {
              setSelectedValues(null);
              setIsVisibleForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Employee;
