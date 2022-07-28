import { EmployeeForm } from "@/components/organisms/EmployeeForm";
import { http } from "@/utils/http";
import { Employee as Payload } from "@/types/employee";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "wouter";

type Props = { id: string };

const useGetEmployeeQuery = (id: string) =>
  useQuery(
    ["employee", id],
    async () => await http.get<Payload>(`/employee/${id}`)
  );

const updateEmployee = async (payload: Payload) => {
  const { id, ...body } = payload;
  const response = await http.put<{ message: string }>(`/employee/${id}`, body);
  return response;
};

const removeEmployee = async (id: Payload["id"]) => {
  const response = await http.delete<{ message: string }>(`/employee/${id}`);
  return response;
};

const RemoveButton = ({ id }: { id: string }) => {
  const [, setLocation] = useLocation();
  const { mutateAsync } = useMutation(removeEmployee, {
    onSuccess: ({ message }) => {
      alert(message);
      setLocation("/");
    },
    onError: (error) => alert(error),
  });

  return <button onClick={() => mutateAsync(id)}>Remove</button>;
};

const EmployeeUpdate = ({ id }: Props) => {
  const { isLoading, data, isError } = useGetEmployeeQuery(id);

  const { mutateAsync } = useMutation(updateEmployee, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Failed to fetch</>;

  return data ? (
    <>
      <h3 style={{ display: "flex", justifyContent: "space-between" }}>
        {data.name} <RemoveButton id={id} />
      </h3>
      <EmployeeForm values={data} onUpdate={mutateAsync} />
    </>
  ) : (
    <>No Employee Found</>
  );
};
export default EmployeeUpdate;
