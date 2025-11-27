import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ViewModule, Add, Edit, Flag, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LIST_EMPLOYEES_QUERY } from '@/graphql';
import { Employee, EmployeePage } from '@/models';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { EditEmployeeDialog } from './EditEmployeeDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

export const EmployeesGrid: React.FC = () => {
  const navigate = useNavigate();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { data, loading, error } = useQuery<{ listEmployees: EmployeePage }>(
    LIST_EMPLOYEES_QUERY
  );

  const handleEdit = (e: React.MouseEvent, employee: Employee) => {
    e.stopPropagation();
    setSelectedEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleFlag = (e: React.MouseEvent, employee: Employee) => {
    e.stopPropagation();
    console.log('Flag employee:', employee);
    // TODO: Implement flag functionality
  };

  const handleDelete = (e: React.MouseEvent, employee: Employee) => {
    e.stopPropagation();
    setSelectedEmployee(employee);
    setOpenDeleteDialog(true);
  };

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
          Employees Grid View
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
            startIcon={<ViewModule />}
            onClick={() => navigate('/employees/tile')}
            fullWidth
            sx={{ display: { xs: 'block', sm: 'inline-flex' } }}
          >
            Tile View
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} elevation={3} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Skills</strong></TableCell>
              <TableCell><strong>Attendance (%)</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee: Employee) => (
              <TableRow
                key={employee.id}
                onClick={() => navigate(`/employees/${employee.id}`)}
                sx={{ 
                  '&:hover': { backgroundColor: '#f9f9f9', cursor: 'pointer' },
                  cursor: 'pointer'
                }}
              >
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.age}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {employee.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${employee.attendance}%`}
                    color={employee.attendance >= 90 ? 'success' : employee.attendance >= 75 ? 'warning' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => handleEdit(e, employee)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Flag">
                      <IconButton
                        size="small"
                        color="warning"
                        onClick={(e) => handleFlag(e, employee)}
                      >
                        <Flag fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => handleDelete(e, employee)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" sx={{ mt: 2 }}>
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
