// Example usage of GraphQL mutations in components

import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE_MUTATION, UPDATE_EMPLOYEE_MUTATION, DELETE_EMPLOYEE_MUTATION, LIST_EMPLOYEES_QUERY } from '@/graphql';

// Example: Add Employee
export const useAddEmployee = () => {
  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE_MUTATION, {
    refetchQueries: [{ query: LIST_EMPLOYEES_QUERY }],
  });

  const handleAdd = async (employeeInput: any) => {
    try {
      const result = await addEmployee({
        variables: {
          input: employeeInput,
        },
      });
      console.log('Employee added:', result.data.addEmployee);
      return result.data.addEmployee;
    } catch (err) {
      console.error('Error adding employee:', err);
      throw err;
    }
  };

  return { handleAdd, loading, error };
};

// Example: Update Employee
export const useUpdateEmployee = () => {
  const [updateEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE_MUTATION, {
    refetchQueries: [{ query: LIST_EMPLOYEES_QUERY }],
  });

  const handleUpdate = async (id: string, employeeInput: any) => {
    try {
      const result = await updateEmployee({
        variables: {
          id,
          input: employeeInput,
        },
      });
      console.log('Employee updated:', result.data.updateEmployee);
      return result.data.updateEmployee;
    } catch (err) {
      console.error('Error updating employee:', err);
      throw err;
    }
  };

  return { handleUpdate, loading, error };
};

// Example: Delete Employee
export const useDeleteEmployee = () => {
  const [deleteEmployee, { loading, error }] = useMutation(DELETE_EMPLOYEE_MUTATION, {
    refetchQueries: [{ query: LIST_EMPLOYEES_QUERY }],
  });

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteEmployee({
        variables: { id },
      });
      console.log('Employee deleted:', result.data.deleteEmployee);
      return result.data.deleteEmployee;
    } catch (err) {
      console.error('Error deleting employee:', err);
      throw err;
    }
  };

  return { handleDelete, loading, error };
};

// Example Component Usage:
/*
import { useAddEmployee } from '@/hooks/useEmployeeMutations';

function AddEmployeeForm() {
  const { handleAdd, loading, error } = useAddEmployee();

  const onSubmit = async (formData) => {
    await handleAdd({
      name: formData.name,
      age: formData.age,
      className: formData.className,
      subjects: formData.subjects,
      attendance: formData.attendance,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      // Form fields here
    </form>
  );
}
*/
