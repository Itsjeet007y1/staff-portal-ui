import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Grid,
  CircularProgress,
  Alert,
  Typography,
  Button,
} from '@mui/material';
import { GridView as GridViewIcon, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LIST_EMPLOYEES_QUERY } from '@/graphql';
import { Employee, EmployeePage } from '@/models';
import { EmployeeTile } from './EmployeeTile';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { EditEmployeeDialog } from './EditEmployeeDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

export const EmployeesTileView: React.FC = () => {
  const navigate = useNavigate();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { data, loading, error } = useQuery<{ listEmployees: EmployeePage }>(
    LIST_EMPLOYEES_QUERY
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading employees: {error.message}</Alert>;
  }

  const employees = data?.listEmployees.content || [];

  const handleTileClick = (employee: Employee) => {
    navigate(`/employees/${employee.id}`);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleFlag = (employee: Employee) => {
    console.log('Flag employee:', employee);
    // TODO: Implement flag functionality
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteDialog(true);
  };

  return (
    <Box>
      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between" 
        alignItems={{ xs: 'stretch', sm: 'center' }} 
        mb={3}
        gap={2}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Employees Tile View
        </Typography>
        <Box display="flex" gap={1} flexDirection={{ xs: 'column', sm: 'row' }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenAddDialog(true)}
            fullWidth
            sx={{ display: { xs: 'block', sm: 'inline-flex' } }}
          >
            Add Employee
          </Button>
          <Button
            variant="outlined"
            startIcon={<GridViewIcon />}
            onClick={() => navigate('/employees/grid')}
            fullWidth
            sx={{ display: { xs: 'block', sm: 'inline-flex' } }}
          >
            Grid View
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {employees.map((employee: Employee) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={employee.id}>
            <EmployeeTile
              employee={employee}
              onClick={() => handleTileClick(employee)}
              onEdit={() => handleEdit(employee)}
              onFlag={() => handleFlag(employee)}
              onDelete={() => handleDelete(employee)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" sx={{ mt: 3 }}>
        Total Employees: {data?.listEmployees.totalElements || 0}
      </Typography>
      <AddEmployeeDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
      <EditEmployeeDialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        employee={selectedEmployee}
      />
      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        employee={selectedEmployee}
      />
    </Box>
  );
};
