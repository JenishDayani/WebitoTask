import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = useCallback(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email] && users[email].password === password) {
      login(users[email]);
      toast.success('Login Successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setTimeout(() => navigate('/profile'), 3100);
      setTimeout(() => navigate('/expense-tracker'), 3100);
    } else {
      toast.error('Invalid Credentials', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [email, password, navigate, login]);

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
                Welcome Back
              </Typography>
              <Typography
                variant='body2'
                align='center'
                color='textSecondary'
                gutterBottom
              >
                Enter your credentials to access your account
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
                  label='Password'
                  type='password'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ borderRadius: 2 }}
                />
                <Button
                  variant='contained'
                  fullWidth
                  sx={{
                    mt: 2,
                    background: '#4F46E5',
                    borderRadius: 2,
                    '&:hover': { background: '#4338CA' },
                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
              <Box textAlign='center' mt={2}>
                <Link
                  to='/reset-password'
                  style={{ textDecoration: 'none', color: '#E11D48' }}
                >
                  <Typography variant='body2'>Forgot Password?</Typography>
                </Link>
              </Box>
              <Box textAlign='center' mt={2}>
                <Typography variant='body2'>Don't have an account?</Typography>
                <Link
                  to='/signup'
                  style={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    color: '#4F46E5',
                  }}
                >
                  Sign Up
                </Link>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </>
  );
};

export default Login;
