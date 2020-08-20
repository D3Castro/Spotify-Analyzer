import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

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