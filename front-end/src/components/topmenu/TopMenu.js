import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function TopMenu(props) {
  const classes = useStyles();
  const user = props.user;
  const userDropDown = props.userDropDown;

  return (
      <AppBar
        position="sticky"
        className={classes.appBar}
        pb={2}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Spotify Analyzer
          </Typography>
          {user && user.id &&
            <div className={classes.userInfo}>
              <Box p={1}>
                  <Typography variant="h6" noWrap>
                    Welcome, {user.display_name}
                  </Typography>
              </Box>
              <Avatar alt="User Image" src={user.images[0].url} />
              {userDropDown}
            </div>
          }
        </Toolbar>
      </AppBar>
  );
}