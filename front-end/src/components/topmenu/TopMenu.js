import React from 'react';
import { styled } from "@mui/system";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider } from '@mui/material';
import DarkTheme from '../../themes/dark';

const styles = styled(() => ({
  appBar: {
    marginBottom: 10,
  },
}));

const StyledDiv = styled('div')(() => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center'
}));

export default function TopMenu(props) {
  const user = props.user;
  const userDropDown = props.userDropDown;

  return (
    <ThemeProvider theme={DarkTheme}>
      <AppBar
        position="sticky"
        sx={styles.appBar}
        pb={2}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Spotify Analyzer
          </Typography>
          {user && user.id &&
            <StyledDiv>
              <Box p={1}>
                  <Typography variant="h6" noWrap>
                    Welcome, {user.display_name}
                  </Typography>
              </Box>
              <Avatar alt="User Image" src={user.images[0].url} />
              {userDropDown}
            </StyledDiv>
          }
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}