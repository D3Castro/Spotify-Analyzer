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
  userSection: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 8,
  },
}));

export default function TopMenu({ user, userDropDown }) {
  return (
    <AppBar position="sticky" sx={styles.appBar} pb={2}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Spotify Analyzer
        </Typography>
        {user?.id && (
          <div sx={styles.userSection}>
            <Typography variant="h6" noWrap sx={styles.userName}>
              Welcome, {user.display_name}
            </Typography>
            <Avatar alt="User Image" src={user.images[0]?.url} />
            {userDropDown}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}