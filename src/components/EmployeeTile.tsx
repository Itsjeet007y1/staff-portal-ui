import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Chip,
} from '@mui/material';
import { MoreVert, Edit, Flag, Delete } from '@mui/icons-material';
import { Employee } from '@/models';

interface EmployeeTileProps {
  employee: Employee;
  onClick: () => void;
  onEdit?: () => void;
  onFlag?: () => void;
  onDelete?: () => void;
}

export const EmployeeTile: React.FC<EmployeeTileProps> = ({
  employee,
  onClick,
  onEdit,
  onFlag,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onEdit?.();
  };

  const handleFlag = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onFlag?.();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onDelete?.();
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
        position: 'relative',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="h6" component="div" gutterBottom>
              {employee.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Department: {employee.department}
            </Typography>
            <Chip
              label={`${employee.attendance}% Attendance`}
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
          <IconButton
            aria-label="more"
            onClick={handleMenuClick}
            size="small"
          >
            <MoreVert />
          </IconButton>
        </Box>
      </CardContent>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleMenuClose()}>
        <MenuItem onClick={handleEdit}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleFlag}>
          <Flag fontSize="small" sx={{ mr: 1 }} />
          Flag
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};
