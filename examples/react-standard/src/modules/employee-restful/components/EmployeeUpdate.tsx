import { EmployeeForm } from "./EmployeeForm";
import { useGetEmployeeQuery } from "../hooks/useGetEmployeeQuery";
import { useRemoveEmployeeMutation } from "../hooks/useRemoveEmployeeMutation";
import { useUpdateEmployeeMutation } from "../hooks/useUpdateEmployeeMutation";

type Props = { id: string };

const EmployeeRemoveButton = ({ id }: { id: string }) => {
  const mutate = useRemoveEmployeeMutation();

  return (
    <button onClick={() => mutate(id)} data-testid="button-remove">
      Remove
    </button>
  );
};

export const EmployeeUpdate = ({ id }: Props) => {
  const { isLoading, data, isError } = useGetEmployeeQuery(id);
  const mutateAsync = useUpdateEmployeeMutation();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Failed to fetch</>;

  return data ? (
    <>
      <h3
        style={{ display: "flex", justifyContent: "space-between" }}
        data-testid="employee-update-title"
      >
        {data.name} <EmployeeRemoveButton id={id} />
      </h3>
      <EmployeeForm values={data} onUpdate={mutateAsync} />
    </>
  ) : (
    <>No Employee Found</>
  );
};
