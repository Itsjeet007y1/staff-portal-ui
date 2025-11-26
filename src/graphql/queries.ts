import { gql } from '@apollo/client';

export const LIST_EMPLOYEES_QUERY = gql`
  query ListEmployees {
    listEmployees {
      totalElements
      totalPages
      content {
        id
        name
        age
        department
        skills
        attendance
      }
    }
  }
`;

export const GET_EMPLOYEE_QUERY = gql`
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      name
      age
      department
      skills
      attendance
    }
  }
`;
