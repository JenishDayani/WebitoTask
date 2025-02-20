import React, { useState, useMemo } from 'react';
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
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddExpense = () => {
    if (title && amount && category && date) {
      const newExpense = { title, amount: parseFloat(amount), category, date };
      if (editIndex !== null) {
        let updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = newExpense;
        setExpenses(updatedExpenses);
        setEditIndex(null);
      } else {
        setExpenses([...expenses, newExpense]);
      }
      setTitle('');
      setAmount('');
      setCategory('');
      setDate('');
    }
  };

  const handleEditExpense = (index) => {
    setTitle(expenses[index].title);
    setAmount(expenses[index].amount);
    setCategory(expenses[index].category);
    setDate(expenses[index].date);
    setEditIndex(index);
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalExpense = useMemo(() => {
    return expenses
      .reduce((acc, expense) => acc + expense.amount, 0)
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
          <TextField
            label='Expense Title'
            fullWidth
            margin='normal'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='Amount'
            type='number'
            fullWidth
            margin='normal'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label='Category'
            fullWidth
            margin='normal'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            label='Date'
            type='date'
            fullWidth
            margin='normal'
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleAddExpense}
            style={{ marginTop: '10px' }}
          >
            {editIndex !== null ? 'Update Expense' : 'Add Expense'}
          </Button>
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
                  <TableCell>{expense.amount.toFixed(2)}</TableCell>
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
