import { http } from "@/utils/http";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Employee } from "@/types/employee";

const useGetEmployeeListQuery = () =>
  useQuery("userList", async () => await http.get<Employee[]>("/employee"));

const EmployeeList = () => {
  const { isLoading, data, isFetched, isError } = useGetEmployeeListQuery();

  return (
    <>
      <h2 data-testid="employee-list-title">Employee</h2>
      <div>{isLoading && "Loading..."}</div>
      <div>{isError && "Failed to fetch"}</div>

      <Link to="/new">Create new employee</Link>

      {isFetched && data?.length ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name }) => (
              <tr key={id}>
                <td>
                  <Link to={`/${id}`}>{id}</Link>
                </td>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No Employee Found"
      )}
    </>
  );
};
export default EmployeeList;
