import { useState } from "react";
import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { Employee as Payload } from "@/types/employee";

// TODO: not yet implemented
const useGetEmployeeQuery = ({ id }: { id: string }) =>
  useQuery("user", async () => await http.get<Payload>(`/employee/${id}`));

const useGetEmployeeListQuery = () =>
  useQuery("userList", async () => await http.get<Payload[]>("/employee"));

// components
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
    </div>
  );
};

export default Employee;
