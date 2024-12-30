import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { auth, db } from '../../utils/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getDocs(collection(db, 'users'));
      const userList = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePostNewUser = () => {
    navigate('/user');
  };

  const handleUpdateUser = (id) => {
    navigate(`/user/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      fetchUsers();
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', letterSpacing: '0.1em' }}>
          Dashboard
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handlePostNewUser}
            sx={{
              marginRight: 2,
              borderColor: 'white',
              color: 'white',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <AddIcon /> Post New User
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
            sx={{
              borderColor: 'white',
              color: 'white',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <LogoutIcon /> LogOut
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ margin: 3, boxShadow: 3, maxWidth: '90%', marginX: 'auto', borderRadius: 2 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Email Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found!
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        marginRight: 1,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: 3,
                        },
                      }}
                      onClick={() => handleUpdateUser(user.id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: 3,
                        },
                      }}
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: 'transparent',
          textAlign: 'center',
          padding: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: 'gray' }}>
          © {new Date().getFullYear()} Your App Name. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Dashboard;
