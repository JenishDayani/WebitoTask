import React, { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    amount: Yup.number()
      .positive('Amount must be positive')
      .required('Amount is required'),
    category: Yup.string().required('Category is required'),
    date: Yup.date().required('Date is required'),
  });

  const formik = useFormik({
    initialValues: { title: '', amount: '', category: '', date: '' },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = values;
        setExpenses(updatedExpenses);
        setEditIndex(null);
      } else {
        setExpenses([...expenses, values]);
      }
      resetForm();
    },
  });

  const handleEditExpense = (index) => {
    formik.setValues(expenses[index]);
    setEditIndex(index);
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalExpense = useMemo(() => {
    return expenses
      .reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
      .toFixed(2);
  }, [expenses]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #4F46E5, #9333EA)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Container
        maxWidth='md'
        style={{
          textAlign: 'center',
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          style={{ fontWeight: 'bold', color: '#4F46E5' }}
        >
          Expense Tracker
        </Typography>
        <Typography variant='h6' gutterBottom style={{ color: '#ff5722' }}>
          Total Expense: ${totalExpense}
        </Typography>
        <Paper style={{ padding: '20px', borderRadius: '10px' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label='Expense Title'
              fullWidth
              margin='normal'
              name='title'
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              label='Amount'
              type='number'
              fullWidth
              margin='normal'
              name='amount'
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
            <TextField
              label='Category'
              fullWidth
              margin='normal'
              name='category'
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            />
            <TextField
              label='Date'
              type='date'
              fullWidth
              margin='normal'
              name='date'
              InputLabelProps={{ shrink: true }}
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
            <Button
              variant='contained'
              color='primary'
              fullWidth
              type='submit'
              style={{ marginTop: '10px' }}
            >
              {editIndex !== null ? 'Update Expense' : 'Add Expense'}
            </Button>
          </form>
        </Paper>

        <TableContainer
          component={Paper}
          style={{ marginTop: '30px', borderRadius: '10px' }}
        >
          <Table>
            <TableHead style={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Title</TableCell>
                <TableCell style={{ color: 'white' }}>Amount ($)</TableCell>
                <TableCell style={{ color: 'white' }}>Category</TableCell>
                <TableCell style={{ color: 'white' }}>Date</TableCell>
                <TableCell style={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{parseFloat(expense.amount).toFixed(2)}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <IconButton
                      color='primary'
                      onClick={() => handleEditExpense(index)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color='secondary'
                      onClick={() => handleDeleteExpense(index)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
