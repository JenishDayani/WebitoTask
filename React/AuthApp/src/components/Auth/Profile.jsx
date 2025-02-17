import React, { useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Avatar,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem('user');
    navigate('/login');
  }, [logout, navigate]);

  const userData = JSON.parse(localStorage.getItem('user'));
  const name = userData ? userData.name : 'Guest';
  const email = userData ? userData.email : 'Not Available';
  const phone = userData ? userData.phone : 'Not Available';
  const dob = userData ? userData.dob : 'Not Available';
  const address = userData ? userData.address : 'Not Available';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #4F46E5, #9333EA)',
      }}
    >
      {/* Navbar */}
      <AppBar position='sticky' sx={{ background: '#4F46E5' }}>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <Button
            color='inherit'
            onClick={handleLogout}
            sx={{
              background: '#EF4444',
              borderRadius: 2,
              '&:hover': { background: '#DC2626' },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Profile Card */}
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
                {name.charAt(0)}
              </Avatar>
              <Typography variant='h4' fontWeight='bold' color='#4F46E5' mt={2}>
                {name}
              </Typography>
              <Typography variant='body1' color='textSecondary' mt={1}>
                {email}
              </Typography>
              <Typography variant='body1' color='textSecondary' mt={1}>
                Phone: {phone}
              </Typography>
              <Typography variant='body1' color='textSecondary' mt={1}>
                Date of Birth: {dob}
              </Typography>
              <Typography variant='body1' color='textSecondary' mt={1}>
                Address: {address}
              </Typography>
              <Box mt={3}>
                <Button
                  variant='contained'
                  fullWidth
                  sx={{
                    background: '#4F46E5',
                    borderRadius: 2,
                    '&:hover': { background: '#4338CA' },
                  }}
                  onClick={() => navigate('/edit-profile')}
                >
                  Edit Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default Profile;
