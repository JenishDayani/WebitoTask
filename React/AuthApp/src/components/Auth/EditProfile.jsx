import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Avatar,
  TextField,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setUserData(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success('Profile updated successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => navigate('/profile'), 3100);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #4F46E5, #9333EA)',
      }}
    >
      <ToastContainer />
      <AppBar position='sticky' sx={{ background: '#4F46E5' }}>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Edit Profile
          </Typography>
          <Button
            color='inherit'
            onClick={() => navigate('/profile')}
            sx={{
              background: '#EF4444',
              borderRadius: 2,
              '&:hover': { background: '#DC2626' },
            }}
          >
            Cancel
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth='sm' sx={{ mt: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            sx={{ p: 4, borderRadius: 4, boxShadow: 5, textAlign: 'center' }}
          >
            <CardContent>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: 'auto',
                  backgroundColor: '#4F46E5',
                }}
              >
                {userData.name.charAt(0)}
              </Avatar>
              <Box mt={3}>
                <TextField
                  label='Full Name'
                  name='name'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={userData.name}
                  onChange={handleChange}
                />
                <TextField
                  label='Email'
                  name='email'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={userData.email}
                  onChange={handleChange}
                />
                <TextField
                  label='Phone Number'
                  name='phone'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={userData.phone}
                  onChange={handleChange}
                />
                <TextField
                  label='Date of Birth'
                  name='dob'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={userData.dob}
                  onChange={handleChange}
                />
                <TextField
                  label='Address'
                  name='address'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={userData.address}
                  onChange={handleChange}
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
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default EditProfile;
