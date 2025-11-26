import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { People, TrendingUp, Assessment, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LIST_EMPLOYEES_QUERY } from '@/graphql';
import { EmployeePage } from '@/models';

export const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<{ listEmployees: EmployeePage }>(LIST_EMPLOYEES_QUERY);

  const employees = data?.listEmployees.content || [];
  const totalEmployees = employees.length;
  const averageAttendance =
    totalEmployees > 0
      ? (employees.reduce((sum, emp) => sum + emp.attendance, 0) / totalEmployees).toFixed(0)
      : '0';
  const activeDepartments = new Set(employees.map((emp) => emp.department)).size;
  const completionRate =
    totalEmployees > 0
      ? ((employees.filter((emp) => emp.attendance >= 75).length / totalEmployees) * 100).toFixed(0)
      : '0';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to the Staff Portal
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3}
            onClick={() => navigate('/employees/grid')}
            sx={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Total Employees
                  </Typography>
                  <Typography variant="h4">{totalEmployees}</Typography>
                </Box>
                <People sx={{ fontSize: 48, color: 'primary.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3}
            onClick={() => navigate('/reports/analytics')}
            sx={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Average Attendance
                  </Typography>
                  <Typography variant="h4">{averageAttendance}%</Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 48, color: 'success.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Active Departments
                  </Typography>
                  <Typography variant="h4">{activeDepartments}</Typography>
                </Box>
                <Assessment sx={{ fontSize: 48, color: 'warning.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Completion Rate
                  </Typography>
                  <Typography variant="h4">{completionRate}%</Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 48, color: 'info.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a sample dashboard view. Navigate to Employees to see the grid and tile views.
        </Typography>
      </Paper>
    </Box>
  );
};
