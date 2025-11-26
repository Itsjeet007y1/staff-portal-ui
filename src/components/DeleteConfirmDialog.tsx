import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE_MUTATION, LIST_EMPLOYEES_QUERY } from '@/graphql';
import { Employee } from '@/models';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  employee,
}) => {
  const [deleteEmployee, { loading }] = useMutation(DELETE_EMPLOYEE_MUTATION, {
    refetchQueries: [{ query: LIST_EMPLOYEES_QUERY }],
  });

  const handleDelete = async () => {
    if (!employee) return;

    try {
      await deleteEmployee({
        variables: {
          id: employee.id,
        },
      });
      onClose();
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Warning color="warning" />
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{employee.name}</strong>?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
