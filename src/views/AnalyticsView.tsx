import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { LIST_EMPLOYEES_QUERY } from '@/graphql';
import { Employee, EmployeePage } from '@/models';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, People, Assessment } from '@mui/icons-material';

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

export const AnalyticsView: React.FC = () => {
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
    return <Alert severity="error">Error loading data: {error.message}</Alert>;
  }

  const employees = data?.listEmployees.content || [];

  // Calculate statistics
  const totalEmployees = employees.length;
  const averageAttendance =
    totalEmployees > 0
      ? employees.reduce((sum, emp) => sum + emp.attendance, 0) / totalEmployees
      : 0;
  const highestAttendance =
    totalEmployees > 0 ? Math.max(...employees.map((emp) => emp.attendance)) : 0;
  const lowestAttendance =
    totalEmployees > 0 ? Math.min(...employees.map((emp) => emp.attendance)) : 0;

  // Attendance distribution (Good: >=90, Average: 75-89, Poor: <75)
  const attendanceDistribution = [
    {
      name: 'Excellent (≥90%)',
      value: employees.filter((emp) => emp.attendance >= 90).length,
      percentage:
        totalEmployees > 0
          ? (employees.filter((emp) => emp.attendance >= 90).length / totalEmployees) * 100
          : 0,
    },
    {
      name: 'Average (75-89%)',
      value: employees.filter((emp) => emp.attendance >= 75 && emp.attendance < 90).length,
      percentage:
        totalEmployees > 0
          ? (employees.filter((emp) => emp.attendance >= 75 && emp.attendance < 90).length /
              totalEmployees) *
            100
          : 0,
    },
    {
      name: 'Poor (<75%)',
      value: employees.filter((emp) => emp.attendance < 75).length,
      percentage:
        totalEmployees > 0
          ? (employees.filter((emp) => emp.attendance < 75).length / totalEmployees) * 100
          : 0,
    },
  ];

  // Top employees by attendance
  const topEmployees = [...employees]
    .sort((a, b) => b.attendance - a.attendance)
    .slice(0, Math.min(10, employees.length))
    .map((emp) => ({
      name: emp.name,
      attendance: emp.attendance,
    }));

  // Bottom employees by attendance
  const bottomEmployees = [...employees]
    .sort((a, b) => a.attendance - b.attendance)
    .slice(0, Math.min(5, employees.length))
    .map((emp) => ({
      name: emp.name,
      attendance: emp.attendance,
    }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Attendance Analytics
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {averageAttendance.toFixed(1)}%
                  </Typography>
                  <Typography variant="body2">Average Attendance</Typography>
                </Box>
                <Assessment sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {totalEmployees}
                  </Typography>
                  <Typography variant="body2">Total Employees</Typography>
                </Box>
                <People sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {highestAttendance}%
                  </Typography>
                  <Typography variant="body2">Highest Attendance</Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {lowestAttendance}%
                  </Typography>
                  <Typography variant="body2">Lowest Attendance</Typography>
                </Box>
                <TrendingDown sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Attendance Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Attendance Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={attendanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Employees Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Top Employees by Attendance
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={topEmployees}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#4caf50" name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bottom Employees Bar Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom color="error">
              Employees Needing Attention (Lowest Attendance)
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={bottomEmployees}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#f44336" name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Attendance Summary Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Attendance Summary by Category
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {attendanceDistribution.map((category, index) => (
                <Grid item xs={12} sm={4} key={category.name}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: COLORS[index],
                      color: 'white',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold">
                      {category.value}
                    </Typography>
                    <Typography variant="body1">{category.name}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {category.percentage.toFixed(1)}% of total
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
