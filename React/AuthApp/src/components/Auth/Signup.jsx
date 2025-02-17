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

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSignup = useCallback(() => {
    if (!name || !email || !password || !phone || !dob || !address) {
      toast.error('All feilds are required', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};

    existingUsers[email] = { name, email, password, phone, dob, address };

    localStorage.setItem('users', JSON.stringify(existingUsers));

    toast.success('User Registered Successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => navigate('/login'), 3100);
  }, [name, email, password, phone, dob, address, navigate]);

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
                Create an Account
              </Typography>
              <Typography
                variant='body2'
                align='center'
                color='textSecondary'
                gutterBottom
              >
                Fill in the details to sign up
              </Typography>
              <Box component='form' noValidate>
                <TextField
                  label='Full Name'
                  type='text'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label='Email Address'
                  type='email'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label='Phone Number'
                  type='tel'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  label='Date of Birth'
                  type='date'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label='Address'
                  type='text'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                  label='Password'
                  type='password'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
              </Box>
              <Box textAlign='center' mt={2}>
                <Typography variant='body2'>
                  Already have an account?
                </Typography>
                <a
                  href='/login'
                  style={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    color: '#4F46E5',
                  }}
                >
                  Login
                </a>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </>
  );
};

export default Signup;
