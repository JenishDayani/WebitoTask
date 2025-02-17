import React, { useState, useCallback } from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = useCallback(() => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email]) {
      users[email].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      toast.success('Password Reset Successfully !', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/login'), 3100);
    } else {
      toast.error('Email not found', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [email, newPassword, confirmPassword, navigate]);

  return (
    <>
      <ToastContainer />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to right, #4F46E5, #9333EA)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card sx={{ p: 4, borderRadius: 4, boxShadow: 5, maxWidth: 400 }}>
            <CardContent>
              <Typography
                variant='h4'
                align='center'
                gutterBottom
                fontWeight='bold'
                color='#4F46E5'
              >
                Reset Password
              </Typography>
              <Typography
                variant='body2'
                align='center'
                color='textSecondary'
                gutterBottom
              >
                Enter your email and new password
              </Typography>
              <Box component='form' noValidate>
                <TextField
                  label='Email Address'
                  type='email'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ borderRadius: 2 }}
                />
                <TextField
                  label='New Password'
                  type='password'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ borderRadius: 2 }}
                />
                <TextField
                  label='Confirm Password'
                  type='password'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ borderRadius: 2 }}
                />
                {error && (
                  <Typography color='error' variant='body2' align='center'>
                    {error}
                  </Typography>
                )}
                <Button
                  variant='contained'
                  fullWidth
                  sx={{
                    mt: 2,
                    background: '#E11D48',
                    borderRadius: 2,
                    '&:hover': { background: '#BE123C' },
                  }}
                  onClick={handleReset}
                >
                  Reset Password
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </>
  );
};

export default ResetPassword;
