import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LIST_EMPLOYEES_QUERY } from '@/graphql';
import { Employee, EmployeePage } from '@/models';

export const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
    return <Alert severity="error">Error loading employee details: {error.message}</Alert>;
  }

  const employee = data?.listEmployees.content.find((emp: Employee) => emp.id === id);

  if (!employee) {
    return (
      <Box>
        <Alert severity="warning">Employee not found</Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom color="primary">
            {employee.name}
          </Typography>
          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Employee ID
              </Typography>
              <Typography variant="h6" gutterBottom>
                {employee.id}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Age
              </Typography>
              <Typography variant="h6" gutterBottom>
                {employee.age} years
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="h6" gutterBottom>
                {employee.department}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Attendance
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6">{employee.attendance}%</Typography>
                <Chip
                  label={
                    employee.attendance >= 90
                      ? 'Excellent'
                      : employee.attendance >= 75
                      ? 'Good'
                      : 'Needs Improvement'
                  }
                  color={
                    employee.attendance >= 90
                      ? 'success'
                      : employee.attendance >= 75
                      ? 'warning'
                      : 'error'
                  }
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Skills
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {employee.skills.map((skill, index) => (
                  <Chip key={index} label={skill} color="primary" variant="outlined" />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
