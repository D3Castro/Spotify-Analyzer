import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const styles = styled(() => ({
  appBar: {
    marginBottom: 10,
  },
  userName: {
    marginLeft: 16,
  },
}));

const UserBar = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
}));

export default function TopMenu({ user, userDropDown }) {
  return (
    <AppBar position="sticky" sx={styles.appBar} pb={2}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap>
          Spotify Analyzer
        </Typography>
        {user?.id && (
          <UserBar>
            <Typography variant="h6" noWrap sx={styles.userName}>
              Welcome, {user.display_name}
            </Typography>
            <Avatar alt="User Image" src={user.images[0]?.url} />
            {userDropDown}
          </UserBar>
        )}
      </Toolbar>
    </AppBar>
  );
}