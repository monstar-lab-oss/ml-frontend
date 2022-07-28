import { EmployeeForm } from "@/components/organisms/EmployeeForm";
import { http } from "@/utils/http";
import { Employee as Payload } from "@/types/employee";
import { useMutation, useQuery } from "react-query";

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

const EmployeeUpdate = ({ id }: Props) => {
  const { isLoading, data, isError } = useGetEmployeeQuery(id);

  const { mutateAsync } = useMutation(updateEmployee, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Failed to fetch</>;

  return data ? (
    <EmployeeForm values={data} onUpdate={mutateAsync} />
  ) : (
    <>No Employee Found</>
  );
};
export default EmployeeUpdate;
