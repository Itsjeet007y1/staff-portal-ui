import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { UPDATE_EMPLOYEE_MUTATION, LIST_EMPLOYEES_QUERY } from '@/graphql';
import { Employee, EmployeeInput } from '@/models';

interface EditEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({
  open,
  onClose,
  employee,
}) => {
  const [formData, setFormData] = useState<EmployeeInput>({
    name: employee?.name || '',
    age: employee?.age || 0,
    department: employee?.department || '',
    skills: employee?.skills || [],
    attendance: employee?.attendance || 0,
  });
  const [subjectInput, setSubjectInput] = useState('');

  const [updateEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE_MUTATION, {
    refetchQueries: [{ query: LIST_EMPLOYEES_QUERY }],
  });

  React.useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        age: employee.age,
        department: employee.department,
        skills: employee.skills,
        attendance: employee.attendance,
      });
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    
    try {
      await updateEmployee({
        variables: {
          id: employee.id,
          input: formData,
        },
      });
      handleClose();
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  const handleClose = () => {
    setSubjectInput('');
    onClose();
  };

  const handleAddSubject = () => {
    if (subjectInput.trim() && !formData.skills.includes(subjectInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, subjectInput.trim()],
      });
      setSubjectInput('');
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== subject),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSubject();
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Employee
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Age"
              type="number"
              fullWidth
              required
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              inputProps={{ min: 1, max: 100 }}
            />
            <TextField
              label="Department"
              fullWidth
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g., Engineering, Marketing"
            />
            
            <Box>
              <TextField
                label="Skills"
                fullWidth
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type and press Enter or click Add"
                InputProps={{
                  endAdornment: (
                    <Button
                      size="small"
                      onClick={handleAddSubject}
                      disabled={!subjectInput.trim()}
                    >
                      Add
                    </Button>
                  ),
                }}
              />
              {formData.skills.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {formData.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleRemoveSubject(skill)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>

            <TextField
              label="Attendance (%)"
              type="number"
              fullWidth
              required
              value={formData.attendance || ''}
              onChange={(e) =>
                setFormData({ ...formData, attendance: parseInt(e.target.value) || 0 })
              }
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error: {error.message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !formData.name || !formData.department || formData.skills.length === 0}
          >
            {loading ? 'Updating...' : 'Update Employee'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
